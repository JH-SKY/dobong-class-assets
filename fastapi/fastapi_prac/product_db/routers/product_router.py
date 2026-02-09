# router 란걸 만들어야됨.
# main.py와 연결해야됨.

from fastapi import APIRouter, Depends, status
from product_db.schemas.product import ProductCreateRequest, ProductResponseWithCategory
from sqlalchemy.orm import Session
from database import get_db
from product_db.services.product_service import product_service

router = APIRouter(prefix="/products-db", tags=["products-db"])


@router.get("/health")
def health_check():
    return "연결 양호"


@router.post(
    "", response_model=ProductResponseWithCategory, status_code=status.HTTP_201_CREATED
)
def create_product(data: ProductCreateRequest, db: Session = Depends(get_db)):
    return product_service.create_product(db, data)


@router.get("", response_model=list[ProductResponseWithCategory])
def get_products(db: Session = Depends(get_db)):
    return product_service.get_products(db)


@router.get("/{product_id}", response_model=ProductResponseWithCategory)
def get_product(product_id: int, db: Session = Depends(get_db)):
    return product_service.get_product(product_id, db)
