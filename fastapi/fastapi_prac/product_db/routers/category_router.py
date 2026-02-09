from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from database import get_db

from product_db.schemas.category import CategoryCreateRequest, CategoryResponse
from product_db.services.category_service import category_service
from product_db.schemas.product import ProductResponse, ProductResponseWithCategory

router = APIRouter(prefix="/category-db", tags=["category-db"])


@router.post("", response_model=CategoryResponse, status_code=status.HTTP_201_CREATED)
def create_category(data: CategoryCreateRequest, db: Session = Depends(get_db)):
    return category_service.create_category(db, data)


@router.get("", response_model=list[CategoryResponse])
def get_categories(db: Session = Depends(get_db)):
    return category_service.get_categories(db)


# category를 return하는 것이 아니라, product를 return함.
@router.get(
    "/{category_id}/products", response_model=list[ProductResponse]
)  # ProductResponseWithCategory 써도 됨.
def get_products_by_category_id(
    category_id: int,
    db: Session = Depends(get_db),
):
    return category_service.get_products_by_category_id(category_id, db)
