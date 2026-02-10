from typing_extensions import Annotated
from fastapi import APIRouter, Depends, Path, Query, status
from sqlalchemy.orm import Session
from database import get_db
from schemas.product import ProductCreateRequest, ProductDetailResponse, ProductListResponse
from services.product_service import product_service


router = APIRouter(prefix="/products", tags=["products"])

@router.post("", response_model=ProductDetailResponse, status_code=status.HTTP_201_CREATED)
def create_product( data : ProductCreateRequest, db: Session = Depends(get_db) ):
    return product_service.create_product(db, data)

@router.get("", response_model=list[ProductListResponse])
def get_product_list(
    keyword: Annotated[str | None, Query(min_length=2)] = None,
    category: Annotated[str | None, Query(alias="p-category")] = None,
    db: Session = Depends(get_db)
    ):

    return product_service.get_products(db, keyword=keyword, category_name=category)

@router.get("/{product_id}", response_model=ProductDetailResponse)
def get_product_detail(
            product_id : Annotated[int, Path(..., ge=1, description="상품 ID")],
            db: Session = Depends(get_db)
            ) :
    return product_service.get_product_detail(db, product_id)
    
@router.put("/{product_id}", response_model=ProductDetailResponse)
def update_product(data : ProductCreateRequest,
            product_id : Annotated[int, Path(..., ge=1, description="상품 ID")],
            db: Session = Depends(get_db)
            ):
    return product_service.update_product(db, product_id, data)


    

