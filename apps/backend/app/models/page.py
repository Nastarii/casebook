from uuid import UUID

from sqlmodel import Field

from app.models.base import EntityBase


class Page(EntityBase, table=True):
    __tablename__ = "pages"

    chapter_id: UUID = Field(foreign_key="chapters.id", index=True)
    title: str = Field(min_length=1, max_length=180)
    slug: str = Field(index=True, min_length=1, max_length=200)
    excerpt: str | None = Field(default=None, max_length=500)
    position: int = Field(default=0, ge=0)
