from product_db.models import Product
from sqlalchemy.orm import Session
from sqlalchemy import select


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

    def find_by_id(self, product_id: int, db: Session):
        return db.get(Product, product_id)


product_repository = ProductRepository()
