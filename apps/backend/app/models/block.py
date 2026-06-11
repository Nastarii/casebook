from enum import StrEnum
from typing import Any
from uuid import UUID

from sqlalchemy import JSON, Column
from sqlmodel import Field

from app.models.base import EntityBase


class BlockType(StrEnum):
    TEXT = "text"
    IMAGE = "image"
    VIDEO = "video"
    CODE = "code"
    ARCHITECTURE = "architecture"
    TIMELINE = "timeline"
    METRICS = "metrics"
    DECISIONS = "decisions"
    GALLERY = "gallery"
    REFERENCES = "references"
    ATTACHMENTS = "attachments"


class Block(EntityBase, table=True):
    __tablename__ = "blocks"

    page_id: UUID = Field(foreign_key="pages.id", index=True)
    type: BlockType = Field(index=True)
    position: int = Field(default=0, ge=0)
    content: dict[str, Any] = Field(default_factory=dict, sa_column=Column(JSON))
