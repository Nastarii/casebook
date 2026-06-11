from typing import Any

from sqlalchemy import JSON, Column
from sqlmodel import Field

from app.models.base import EntityBase


class Template(EntityBase, table=True):
    __tablename__ = "templates"

    name: str = Field(min_length=1, max_length=160)
    description: str | None = Field(default=None, max_length=500)
    structure: dict[str, Any] = Field(default_factory=dict, sa_column=Column(JSON))
