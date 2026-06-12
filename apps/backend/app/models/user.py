from datetime import datetime

from sqlmodel import Field

from app.models.base import EntityBase


class User(EntityBase, table=True):
    __tablename__ = "users"

    name: str = Field(min_length=1, max_length=160)
    email: str = Field(index=True, unique=True, min_length=3, max_length=255)
    hashed_password: str = Field(min_length=1)
    is_active: bool = True
    is_email_verified: bool = False
    email_verified_at: datetime | None = Field(default=None)
