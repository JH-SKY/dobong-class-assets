# mysite4/routers/user_router.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from mysite4.schemas.user import UserResponse
from mysite4.schemas.post2 import Post2ListResponse
from mysite4.models.user import User
from mysite4.dependencies import get_current_user
from mysite4.services.user_service import user_service

router = APIRouter(tags=["Users"])


@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user


@router.get("/me/posts", response_model=list[Post2ListResponse])
def read_my_posts(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """내가 작성한 게시글 목록 조회"""
    return user_service.read_posts_by_user_id(db, current_user.id)


@router.get("/users/{user_id}/posts", response_model=list[Post2ListResponse])
def read_posts_by_user(user_id: int, db: Session = Depends(get_db)):
    """특정 유저가 작성한 게시글 목록 조회"""
    return user_service.read_posts_by_user_id(db, user_id)
