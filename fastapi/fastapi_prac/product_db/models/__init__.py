from .product import Product
from .category import Category
from .user import User
from .wishlist import WishList
from database import Base
from .user2 import User2
from .wishlist2 import WishList2

__all__ = ["Base", "Product", "Category", "User", "WishList","User2","WishList2"]
