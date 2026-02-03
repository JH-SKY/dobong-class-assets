# post_api.py
from fastapi import APIRouter
from .post import PostCreate, Post

# 경로 접두사 설정
router = APIRouter(prefix="/posts-pydantic")

# 게시글 저장소 역할을 수행하는 리스트
posts = []
# 고유 식별자 생성을 위한 카운터
post_id = 0


@router.post("")
def create_post(post_data: PostCreate):
    # post_data에는 제목, 내용이라는 필드만 들어가야 합니다.
    # basemodel을 통해 제목, 내용만 들어있도록 강제한다.
    global post_id
    post_id += 1

    post = Post(post_id, post_data.title, post_data.content)

    posts.append(post)

    return post


@router.get("")
def read_posts():
    # 저장된 모든 게시글 반환
    return posts
