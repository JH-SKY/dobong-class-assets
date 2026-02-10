from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from database import get_db
from product_db.schemas.user import UserResponse, UserCreate, UserDetailResponse
from product_db.services.user_service import user_service
from product_db.schemas.product import ProductResponse

router = APIRouter(prefix="/users")


@router.post("", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def create_user(data: UserCreate, db: Session = Depends(get_db)):
    return user_service.create_user(db, data)


@router.get("", response_model=list[UserResponse])
def read_users(db: Session = Depends(get_db)):
    return user_service.read_users(db)


@router.post("/{user_id}/wishlist/{product_id}")
def add_wishlist(user_id: int, product_id: int, db: Session = Depends(get_db)):
    return user_service.add_wishlist(user_id, product_id, db)


# [GET] /users/{user_id}/wishlist: 특정 사용자의 위시리스트 목록 조회
@router.get("/{user_id}/wishlist", response_model=UserDetailResponse)
def read_wishlist(user_id: int, db: Session = Depends(get_db)):
    return user_service.read_wishlist(user_id, db)


# [GET] /users/{user_id}/wishlist: 특정 사용자의 위시리스트 목록 조회
@router.get("/{user_id}/wishlist/v2", response_model=list[ProductResponse])
def read_wishlist_v2(user_id: int, db: Session = Depends(get_db)):
    return user_service.read_wishlist_v2(user_id, db)


# [DELETE] /users/{user_id}/wishlist/{product_id}: 위시리스트 삭제 (찜 취소)
@router.delete("/{user_id}/wishlist/{product_id}", status_code=204)
def delete_wishlist(user_id: int, product_id, db: Session = Depends(get_db)):
    return user_service.delete_wishlist(user_id, product_id, db)
