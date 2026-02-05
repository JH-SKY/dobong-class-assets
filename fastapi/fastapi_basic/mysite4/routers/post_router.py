# routers/post_router.py

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from database import get_db
from mysite4.services.post_service import post_service
from mysite4.schemas.post import PostCreate, PostDetailResponse, PostListResponse

router = APIRouter(prefix="/posts-db", tags=["posts"])

@router.post("", response_model=PostDetailResponse, status_code=status.HTTP_201_CREATED)
def create_post(data: PostCreate, db: Session = Depends(get_db)):
    # Depends(get_db)를 통해 요청마다 새로운 세션을 주입받는다.
    return post_service.create_post(db, data)

@router.get("", response_model=list[PostListResponse])
def read_posts(db: Session = Depends(get_db)):
    return post_service.read_posts(db)

@router.get("/{id}", response_model=PostDetailResponse)
def read_post(id: int, db: Session = Depends(get_db)):
    return post_service.read_post_by_id(db, id)

@router.put("/{id}", response_model=PostDetailResponse)
def update_post(id: int, data: PostCreate, db: Session = Depends(get_db)):
    return post_service.update_post(db, id, data)

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(id: int, db: Session = Depends(get_db)):
    post_service.delete_post(db, id)