from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Text
from database import Base
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .comment import Comment


class Post(Base):
    __tablename__ = "posts"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(50), nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=False)

    comments: Mapped[list["Comment"]] = relationship(
        "Comment", back_populates="post", cascade="all, delete-orphan"
    )
