import hmac
import os
from datetime import UTC, datetime, timedelta
from hashlib import pbkdf2_hmac
from typing import Any, cast
from uuid import uuid4

from jose import JWTError, jwt  # type: ignore[import-untyped]

from app.core.settings import settings

HASH_NAME = "sha256"
PASSWORD_ITERATIONS = 390_000


def hash_password(password: str) -> str:
    salt = os.urandom(16)
    digest = pbkdf2_hmac(HASH_NAME, password.encode("utf-8"), salt, PASSWORD_ITERATIONS)
    return f"pbkdf2_{HASH_NAME}${PASSWORD_ITERATIONS}${salt.hex()}${digest.hex()}"


def verify_password(password: str, password_hash: str) -> bool:
    try:
        algorithm, iterations, salt_hex, digest_hex = password_hash.split("$", maxsplit=3)
    except ValueError:
        return False

    if algorithm != f"pbkdf2_{HASH_NAME}":
        return False

    digest = pbkdf2_hmac(
        HASH_NAME,
        password.encode("utf-8"),
        bytes.fromhex(salt_hex),
        int(iterations),
    )
    return hmac.compare_digest(digest.hex(), digest_hex)


def create_access_token(subject: str) -> str:
    expires_at = datetime.now(UTC) + timedelta(
        minutes=settings.jwt_access_token_expire_minutes,
    )
    payload: dict[str, Any] = {"sub": subject, "exp": expires_at}
    return cast(str, jwt.encode(payload, settings.jwt_secret_key, algorithm=settings.jwt_algorithm))


def get_token_subject(token: str) -> str | None:
    try:
        payload = jwt.decode(token, settings.jwt_secret_key, algorithms=[settings.jwt_algorithm])
    except JWTError:
        return None

    subject = payload.get("sub")
    return subject if isinstance(subject, str) else None


def create_plain_token() -> str:
    return uuid4().hex + uuid4().hex


def hash_token(token: str) -> str:
    return hmac.new(
        settings.jwt_secret_key.encode("utf-8"),
        token.encode("utf-8"),
        HASH_NAME,
    ).hexdigest()
