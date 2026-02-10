# services/comment_service.py

from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from models.product import Product
from repositories.category_repository import category_repository
from repositories.product_repository import product_repository
from schemas.product import ProductCreateRequest


class ProductService:
    def create_product(self, db: Session, data: ProductCreateRequest):
        with db.begin():
            # 1. 카테고리 조회 (ID가 아닌 객체로 가져오기)
            category = category_repository.find_by_name(db, data.category)
            if not category:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="존재하지 않는 카테고리입니다.",
                )

            # 2. 상품 객체 생성 (관계 변수 'category'에 객체를 직접 대입)
            new_product = Product(
                name=data.name,
                price=data.price,
                discount_price=data.discount_price,
                stock=data.stock,
                category=category,  # category_id 대신 객체 연결
            )

            product_repository.save(db, new_product)
            db.refresh(new_product)
            
        new_product.final_price = new_product.price - new_product.discount_price
        new_product.is_sold_out = new_product.stock == 0

        return new_product

    def get_products(self, db: Session, keyword: str = None, category_name: str = None):
        products = product_repository.find_all(db, keyword=keyword, category_name=category_name)
        for p in products:
            p.final_price = p.price - p.discount_price
        return products
    
    def get_product_detail(self, db: Session, product_id: int):
        
        product = product_repository.find_by_id(db, product_id)
        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="존재하지 않는 상품입니다.",
            )
        
        product.final_price = product.price - product.discount_price
        # if product.stock == 0:
        #     product.is_sold_out = True
        # else:
        # product.is_sold_out = False
        product.is_sold_out = product.stock == 0

        return product

    def update_product(self, db: Session, product_id: int, data: ProductCreateRequest):
        with db.begin():
            product = product_repository.find_by_id(db, product_id)
        
            if not product:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="존재하지 않는 상품입니다.",
                )
            
            # 상품 정보 업데이트
            product.name = data.name
            product.price = data.price
            product.discount_price = data.discount_price
            product.stock = data.stock

            # 카테고리 업데이트 (카테고리 이름이 변경된 경우)
            if data.category != product.category.name:
                category = category_repository.find_by_name(db, data.category)
                if not category:
                    raise HTTPException(
                        status_code=status.HTTP_404_NOT_FOUND,
                        detail="존재하지 않는 카테고리입니다.",
                    )
                product.category = category


        return product  

product_service = ProductService()
