# schemas/post.py

from pydantic import BaseModel, ConfigDict

class PostCreate(BaseModel):
    title: str
    content: str

class PostListResponse(BaseModel):
    id: int
    title: str

    # SQLAlchemy 모델 객체를 Pydantic에서 읽기 위한 설정
    model_config = ConfigDict(from_attributes=True)

class PostDetailResponse(BaseModel):
    id: int
    title: str
    content: str

    model_config = ConfigDict(from_attributes=True)