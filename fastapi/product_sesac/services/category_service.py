# services/post_service.py

from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from repositories.product_repository import product_repository
from models.product import Product
from schemas.category import CategoryCreateRequest

class create_category :

    def create_category (self, db: Session, data: CategoryCreateRequest ):
        with db.begin():
            category = category_repository.find_by_name(db, data.name)
            if category:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="이미 있는 카테고리입니다.",
                )
            
            new_category = CategoryCreateRequest(name=data.name)




create_service = create_category()