from sqlmodel import Field

from app.models.base import EntityBase


class Project(EntityBase, table=True):
    __tablename__ = "projects"

    title: str = Field(min_length=1, max_length=160)
    slug: str = Field(index=True, unique=True, min_length=1, max_length=180)
    subtitle: str | None = Field(default=None, max_length=240)
    summary: str | None = Field(default=None, max_length=800)
    cover_asset_id: str | None = Field(default=None, max_length=120)
