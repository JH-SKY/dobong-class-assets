from product_db.models import Product, User, WishList
from sqlalchemy.orm import Session, selectinload
from sqlalchemy import select


class UserRepository:
    def save(self, db: Session, user: User):
        db.add(user)
        return user

    def find_all(self, db: Session):
        return db.scalars(select(User)).all()

    def find_by_id(self, user_id, db: Session):
        return db.get(User, user_id)

    def find_by_id_with_wishlist_product(self, user_id, db: Session):
        return db.get(
            User,
            user_id,
            options=[
                selectinload(User.wishlists).joinedload(WishList.product),
            ],
        )


user_repository = UserRepository()
