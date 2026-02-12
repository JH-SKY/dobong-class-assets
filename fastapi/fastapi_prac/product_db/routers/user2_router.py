# mysite4/routers/user_router.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from product_adv.schemas.product import ProductListResponse
from product_db.schemas.user2 import UserResponse
from product_db.models.user2 import User2
from product_db.dependencies import get_current_user
from product_db.services.user2_service import user2_service

router = APIRouter(tags=["Users"])


@router.get("/me", response_model=UserResponse)
def get_me(current_user: User2 = Depends(get_current_user)):
    return current_user


@router.get("/me/wishlist")
def read_my_wishlist(
    db: Session = Depends(get_db), current_user: User2 = Depends(get_current_user)
):
    """내가 찜한상품 목록 조회"""
    return user2_service.read_wishlist_by_user_id(db, current_user.id)


@router.post("/wishlist2/{product_id}")
def add_to_wishlist(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User2 = Depends(get_current_user),
):
    """찜하기"""
    return user2_service.add_to_wishlist(db, current_user.id, product_id)


@router.delete("/wishlist2/{product_id}")
def remove_from_wishlist(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User2 = Depends(get_current_user),
):
    """찜하기 취소"""
    return user2_service.remove_from_wishlist(db, current_user.id, product_id)
