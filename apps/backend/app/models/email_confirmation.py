from datetime import datetime
from uuid import UUID

from sqlmodel import Field

from app.models.base import EntityBase


class EmailConfirmationToken(EntityBase, table=True):
    __tablename__ = "email_confirmation_tokens"

    user_id: UUID = Field(foreign_key="users.id", index=True)
    token_hash: str = Field(index=True, unique=True, min_length=1, max_length=128)
    expires_at: datetime = Field(nullable=False)
    confirmed_at: datetime | None = Field(default=None)
