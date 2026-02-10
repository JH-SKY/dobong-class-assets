from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Integer, ForeignKey
from database import Base
from sqlalchemy.ext.associationproxy import association_proxy, AssociationProxy

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .wishlist import WishList
    from .product import Product


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    nickname: Mapped[str] = mapped_column(String(50), nullable=False)

    wishlists: Mapped[list["WishList"]] = relationship(
        "WishList", back_populates="user", cascade="all, delete-orphan"
    )

    wishlist_items: AssociationProxy[list["Product"]] = association_proxy(
        "wishlists", "product"
    )
