from uuid import UUID

from sqlmodel import Field

from app.models.base import EntityBase


class Asset(EntityBase, table=True):
    __tablename__ = "assets"

    project_id: UUID = Field(foreign_key="projects.id", index=True)
    name: str = Field(min_length=1, max_length=180)
    object_key: str = Field(min_length=1, max_length=500)
    mime_type: str = Field(min_length=1, max_length=120)
    alt_text: str | None = Field(default=None, max_length=240)
    size_bytes: int = Field(default=0, ge=0)
