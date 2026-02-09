from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String
from database import Base
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .product import Product


# id, name
class Category(Base):
    __tablename__ = "categories"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(50), nullable=False, unique=True)

    products: Mapped[list["Product"]] = relationship(
        "Product", back_populates="category", cascade="all, delete-orphan"
    )
