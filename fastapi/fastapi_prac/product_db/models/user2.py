# models/user.py

from datetime import datetime

from sqlalchemy import String, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database import Base
from typing import TYPE_CHECKING
from sqlalchemy.ext.associationproxy import association_proxy, AssociationProxy

from product_db.models.product import Product

if TYPE_CHECKING:
    from .wishlist2 import WishList2


class User2(Base):
    __tablename__ = "users2"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(200), nullable=False)
    nickname: Mapped[str] = mapped_column(String(50), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, server_default=func.now(), nullable=False
    )

    # 추가적인 컬럼들을 여기에다가 다 넣어도 괜찮아요.
    wishlists2: Mapped[list["WishList2"]] = relationship(back_populates="user2")
    wishlist_items: AssociationProxy[list["Product"]] = association_proxy(
        "wishlists2", "product", creator=lambda _product: WishList2(product =_product)
    )
