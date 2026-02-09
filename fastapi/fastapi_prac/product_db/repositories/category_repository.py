from sqlalchemy.orm import Session
from product_db.models import Category
from sqlalchemy import select


class CategoryRepository:
    def save(self, db: Session, category: Category):
        db.add(category)
        return category

    def find_by_name(self, db: Session, name: str):
        stmt = select(Category).where(Category.name == name)
        category = db.scalars(stmt).first()
        return category

    def find_all(self, db:Session):
        stmt = select(Category)
        return db.scalars(stmt).all()


category_repository = CategoryRepository()
