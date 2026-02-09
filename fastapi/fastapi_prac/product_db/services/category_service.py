from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from product_db.models import Category
from product_db.schemas.category import CategoryCreateRequest
from product_db.repositories.category_repository import category_repository
from product_db.repositories.product_repository import product_repository


class CategoryService:
    def create_category(self, db: Session, data: CategoryCreateRequest):
        with db.begin():
            # 바로 만드는 것이 아니라, 있는지 한번 확인하고 없으면 진행을 합니다.
            category = category_repository.find_by_name(db, data.name)
            if category:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="이미 있는 카테고리입니다.",
                )

            new_category = Category(name=data.name)
            category_repository.save(db, new_category)

        # commit을 하기 전까지는 new_category는 name만 가지는 상태.
        # id같은건 database에서 만들어줌. 그걸 받아오는 녀석.
        db.refresh(new_category)

        return new_category

    def get_categories(self, db: Session):
        return category_repository.find_all(db)

    def get_products_by_category_id(self, category_id: int, db: Session):
        # 없는 카테고리를 입력하게 되면 그냥 빈 리스트를 줄건지
        # 아니면 없는 카테고리라고 말할건지
        return product_repository.find_by_category_id(category_id, db)

category_service = CategoryService()
