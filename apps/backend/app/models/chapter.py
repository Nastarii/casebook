from uuid import UUID

from sqlmodel import Field

from app.models.base import EntityBase


class Chapter(EntityBase, table=True):
    __tablename__ = "chapters"

    project_id: UUID = Field(foreign_key="projects.id", index=True)
    title: str = Field(min_length=1, max_length=160)
    summary: str | None = Field(default=None, max_length=500)
    position: int = Field(default=0, ge=0)
