from sqlalchemy.orm import Session
from product_db.schemas.product import ProductCreateRequest
from product_db.models import Product
from product_db.repositories.category_repository import category_repository
from fastapi import HTTPException, status
from product_db.repositories.product_repository import product_repository


class ProductService:
    def create_product(self, db: Session, data: ProductCreateRequest):
        with db.begin():
            # 1. 카테고리를 가져온다.
            # 있는지 확인한다
            # category_service에 get_category라는 함수를 만들어서 가져와서 사용해도 괜찮음.
            category = category_repository.find_by_name(db, data.category)
            if not category:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="없는 카테고리입니다.",
                )

            # 2. 있으면 바로 product에 넣어준다.
            new_product = Product(name=data.name, price=data.price, category=category)

            product_repository.save(db, new_product)

        db.refresh(new_product)
        return new_product

    def get_products(self, db):
        return product_repository.find_all(db)

    def get_product(self, product_id, db):
        product = product_repository.find_by_id(product_id, db)
        if not product:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="없어")
        return product_repository.find_by_id(product_id, db)


product_service = ProductService()
