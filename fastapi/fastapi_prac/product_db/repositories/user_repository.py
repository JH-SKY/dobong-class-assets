from product_db.models import Product, User
from sqlalchemy.orm import Session
from sqlalchemy import select


class UserRepository:
    def save(self, db: Session, user: User):
        db.add(user)
        return user

    def find_all(self, db: Session):
        return db.scalars(select(User)).all()

    def find_by_id(self, user_id, db: Session):
        return db.get(User, user_id)


user_repository = UserRepository()
