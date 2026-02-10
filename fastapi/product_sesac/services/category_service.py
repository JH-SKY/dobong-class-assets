# services/post_service.py

from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from models.category import Category
from repositories.product_repository import product_repository
from repositories.category_repository import category_repository
from models.product import Product
from schemas.category import CategoryCreateRequest

class CategoryService :

    def create_category (self, db: Session, data: CategoryCreateRequest ):
        with db.begin():
            category = category_repository.find_by_name(db, data.name)
            if category:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="이미 있는 카테고리입니다.",
                )
            
            new_category = Category(name=data.name)
            category_repository.save(db, new_category)

        db.refresh(new_category)

        return new_category

    def get_categories(self, db: Session):
        return category_repository.find_all(db)
    
    def get_products_by_category(self, category_id: int, db: Session):
        category = category_repository.find_by_id(db, category_id)
        if not category:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="카테고리를 찾을 수 없습니다.",
            )
        return product_repository.find_by_category_id(db, category_id)



category_service = CategoryService()