# routers/post_router.py

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from database import get_db
from mysite4.services.post_service import post_service
from mysite4.schemas.post import PostCreate, PostDetailResponse, PostListResponse
from mysite4.services.comment_service import comment_service
from mysite4.schemas.comment import CommentCreate, CommentResponse

router = APIRouter(prefix="/posts-db", tags=["posts"])


