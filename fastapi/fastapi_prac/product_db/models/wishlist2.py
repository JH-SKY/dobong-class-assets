# mysite4/models/post2.py
from datetime import datetime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey, func
from database import Base
from typing import TYPE_CHECKING



if TYPE_CHECKING:
    from .user2 import User2
    from .product import Product


class WishList2(Base):
    __tablename__ = "wishlist2"

    user_id: Mapped[int] = mapped_column(ForeignKey("users2.id"), primary_key=True)
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id"), primary_key=True)
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())

    # User와의 관계 설정 (N:1)
    user2: Mapped["User2"] = relationship("User2", back_populates="wishlists2")
    product: Mapped["Product"] = relationship("Product", back_populates="wishlists2")
