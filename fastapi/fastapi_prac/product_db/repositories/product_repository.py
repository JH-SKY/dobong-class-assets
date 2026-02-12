from product_db.models import Product, WishList
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import select

from product_db.models.wishlist2 import WishList2


class ProductRepository:
    def save(self, db: Session, product: Product):
        db.add(product)
        return product

    def find_by_category_id(self, category_id: int, db: Session):
        stmt = select(Product).where(Product.category_id == category_id)
        # SELECT * FROM Product WHRER Product.category_id = category_id
        return db.scalars(stmt).all()

    def find_all(self, db: Session):
        return db.scalars(select(Product)).all()

    def find_all_with_category(self, db: Session):
        return db.scalars(select(Product).options(joinedload(Product.category))).all()

    def find_by_id(self, product_id: int, db: Session):
        return db.get(Product, product_id)

    def find_by_id_with_category(self, product_id, db: Session):
        return db.get(
            Product,
            product_id,
            options=[
                joinedload(Product.category),
            ],
        )

    def find_by_wishlist_user(self, user_id, db: Session):
        stmt = (
            select(Product).join(Product.wishlists).where(WishList.user_id == user_id)
        )
        return db.scalars(stmt).all()

    def find_by_user_id(self, db: Session, user_id: int):
        return db.scalars(
            select(Product)
            .options(joinedload(Product.user))
            .where(Product.user_id == user_id)
            .order_by(Product.id)
        ).all()
    
    def find_wishlist_by_user_id(self, db: Session, user_id: int):
        stmt = (
            select(Product).join(Product.wishlists2).where(WishList2.user_id == user_id)
        )
        return db.scalars(stmt).all()
    
    def add_to_wishlist(self, db: Session, user_id: int, product_id: int):
        wishlist_entry = WishList2(user_id=user_id, product_id=product_id)
        db.add(wishlist_entry)
        db.commit()
        return {"찜하기 완료"}

product_repository = ProductRepository()
