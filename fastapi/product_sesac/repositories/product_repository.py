from sqlalchemy.orm import Session
from sqlalchemy import select
from models.category import Category
from models.product import Product


class ProductRepository:
    def save(self, db: Session, product: Product):
        db.add(product)
        db.flush()  # flush를 통해 DB에 반영하여 ID 등 자동 생성된 값이 객체에 반영되도록 함
        return product
    
    def find_all(self, db: Session, keyword: str = None, category_name: str = None):
        stmt = select(Product)
        
        if keyword:
            stmt = stmt.where(Product.name.contains(keyword))
        
        if category_name:
            stmt = stmt.join(Product.category).where(Category.name == category_name)
            
        stmt = stmt.order_by(Product.id.desc())
        return db.scalars(stmt).all()

    def find_by_id(self, db: Session, product_id: int):
        stmt = select(Product).where(Product.id == product_id)
        return db.scalar(stmt)
    
    def find_by_category_id(self, db: Session, category_id: int):
        stmt = select(Product).where(Product.category_id == category_id)
        return db.scalars(stmt).all()   
    
product_repository = ProductRepository()
