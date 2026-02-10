# repositories/comment_repository.py

from sqlalchemy.orm import Session
from sqlalchemy import select
from models.category import Category


class CategoryRepository :
    def find_by_name(self, db: Session, name: str):
        stmt = select(Category).where(Category.name == name)
        category = db.scalars(stmt).first()
        return category

    def find_all(self, db:Session):
        stmt = select(Category)
        return db.scalars(stmt).all()
    def save(self, db: Session, category: Category):
        db.add(category)
        db.commit()

    def find_by_id(self, db: Session, category_id: int):
        stmt = select(Category).where(Category.id == category_id)
        category = db.scalars(stmt).first()
        return category


category_repository = CategoryRepository()