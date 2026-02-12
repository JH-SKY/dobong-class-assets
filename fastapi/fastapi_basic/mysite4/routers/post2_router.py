# mysite4/routers/post2_router.py
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from database import get_db
from mysite4.services.post2_service import post2_service
from mysite4.schemas.post2 import Post2Create, Post2DetailResponse, Post2ListResponse
from mysite4.dependencies import get_current_user
from mysite4.models.user import User

router = APIRouter(prefix="/posts2", tags=["posts2"])


@router.post(
    "", response_model=Post2DetailResponse, status_code=status.HTTP_201_CREATED
)
def create_post(
    data: Post2Create,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),  # 로그인한 유저 자동 주입
):
    return post2_service.create_post(db, data, current_user)


# mysite4/routers/post2_router.py (추가)


# 로그인 안해도 조회 가능
@router.get("", response_model=list[Post2ListResponse])
def read_posts(db: Session = Depends(get_db)):
    return post2_service.read_posts(db)


# 로그인을 해야만 조회 가능.
@router.get("/{id}", response_model=Post2DetailResponse)
def read_post(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),  # 로그인한 유저 자동 주입
):
    return post2_service.read_post_by_id(db, id)


# mysite4/routers/post2_router.py (추가)


@router.put("/{id}", response_model=Post2DetailResponse)
def update_post(
    id: int,
    data: Post2Create,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),  # 본인 확인용
):
    return post2_service.update_post(db, id, data, current_user)


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),  # 본인 확인용
):
    post2_service.delete_post(db, id, current_user)
