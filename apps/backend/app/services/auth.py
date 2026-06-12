from datetime import UTC, datetime, timedelta

from sqlmodel import Session, col, select

from app.core.security import (
    create_access_token,
    create_plain_token,
    hash_password,
    hash_token,
    verify_password,
)
from app.core.settings import settings
from app.models.email_confirmation import EmailConfirmationToken
from app.models.user import User
from app.schemas.auth import RegisterRequest
from app.services.email import send_email_confirmation


class AuthError(ValueError):
    pass


class EmailAlreadyRegisteredError(AuthError):
    pass


class EmailNotConfirmedError(AuthError):
    pass


def ensure_aware(value: datetime) -> datetime:
    if value.tzinfo is None:
        return value.replace(tzinfo=UTC)
    return value


def register_user(session: Session, payload: RegisterRequest) -> tuple[User, str | None]:
    existing_user = session.exec(select(User).where(User.email == payload.email)).first()
    if existing_user is not None:
        raise EmailAlreadyRegisteredError("Email already registered")

    now = datetime.now(UTC)
    user = User(
        name=payload.name.strip(),
        email=payload.email,
        hashed_password=hash_password(payload.password),
        is_email_verified=not settings.email_confirmation_required,
        email_verified_at=now if not settings.email_confirmation_required else None,
    )
    session.add(user)
    session.commit()
    session.refresh(user)

    if not settings.email_confirmation_required:
        return user, create_access_token(str(user.id))

    plain_token = create_plain_token()
    confirmation = EmailConfirmationToken(
        user_id=user.id,
        token_hash=hash_token(plain_token),
        expires_at=now + timedelta(hours=settings.email_confirmation_token_expire_hours),
    )
    session.add(confirmation)
    session.commit()
    send_email_confirmation(user, plain_token)
    return user, None


def authenticate_user(session: Session, email: str, password: str) -> tuple[User, str]:
    user = session.exec(select(User).where(User.email == email)).first()
    if user is None or not verify_password(password, user.hashed_password) or not user.is_active:
        raise AuthError("Invalid credentials")

    if settings.email_confirmation_required and not user.is_email_verified:
        raise EmailNotConfirmedError("Email confirmation required")

    return user, create_access_token(str(user.id))


def confirm_email(session: Session, token: str) -> User:
    token_hash = hash_token(token)
    confirmation = session.exec(
        select(EmailConfirmationToken).where(
            EmailConfirmationToken.token_hash == token_hash,
            col(EmailConfirmationToken.confirmed_at).is_(None),
        ),
    ).first()

    now = datetime.now(UTC)
    if confirmation is None or ensure_aware(confirmation.expires_at) < now:
        raise AuthError("Invalid or expired confirmation token")

    user = session.get(User, confirmation.user_id)
    if user is None:
        raise AuthError("Invalid confirmation token")

    user.is_email_verified = True
    user.email_verified_at = now
    confirmation.confirmed_at = now
    session.add(user)
    session.add(confirmation)
    session.commit()
    session.refresh(user)
    return user
