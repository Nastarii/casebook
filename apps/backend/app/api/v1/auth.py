from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends, Header, HTTPException, status
from sqlmodel import Session

from app.core.database import get_session
from app.core.security import get_token_subject
from app.models.user import User
from app.schemas.auth import (
    AuthResponse,
    ConfirmEmailRequest,
    LoginRequest,
    RegisterRequest,
    TokenResponse,
    UserResponse,
)
from app.services.auth import (
    AuthError,
    EmailAlreadyRegisteredError,
    EmailNotConfirmedError,
    authenticate_user,
    confirm_email,
    register_user,
)
from app.services.email import EmailDeliveryError

router = APIRouter(prefix="/auth", tags=["auth"])
SessionDep = Annotated[Session, Depends(get_session)]
AuthorizationHeader = Annotated[str | None, Header()]


def to_user_response(user: User) -> UserResponse:
    return UserResponse(
        id=user.id,
        name=user.name,
        email=user.email,
        is_active=user.is_active,
        is_email_verified=user.is_email_verified,
    )


def get_current_user(
    session: SessionDep,
    authorization: AuthorizationHeader = None,
) -> User:
    if authorization is None or not authorization.lower().startswith("bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing bearer token")

    subject = get_token_subject(authorization.split(" ", maxsplit=1)[1])
    if subject is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

    user = session.get(User, UUID(subject))
    if user is None or not user.is_active:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    return user


@router.post("/register", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
def register(payload: RegisterRequest, session: SessionDep) -> AuthResponse:
    try:
        user, access_token = register_user(session, payload)
    except EmailAlreadyRegisteredError as exc:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(exc)) from exc
    except EmailDeliveryError as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Unable to send confirmation email",
        ) from exc

    return AuthResponse(
        access_token=access_token,
        user=to_user_response(user),
        email_confirmation_required=access_token is None,
    )


@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest, session: SessionDep) -> TokenResponse:
    try:
        _, access_token = authenticate_user(session, payload.email, payload.password)
    except EmailNotConfirmedError as exc:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Email confirmation required",
        ) from exc
    except AuthError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        ) from exc

    return TokenResponse(access_token=access_token)


@router.post("/confirm-email", response_model=UserResponse)
def confirm_email_address(
    payload: ConfirmEmailRequest,
    session: SessionDep,
) -> UserResponse:
    try:
        user = confirm_email(session, payload.token)
    except AuthError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired confirmation token",
        ) from exc

    return to_user_response(user)


@router.get("/me", response_model=UserResponse)
def read_current_user(user: Annotated[User, Depends(get_current_user)]) -> UserResponse:
    return to_user_response(user)
