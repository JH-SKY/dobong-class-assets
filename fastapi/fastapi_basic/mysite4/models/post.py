# models/post.py

from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Text
from database import Base

class Post(Base):
    __tablename__ = "posts"

    # primary_key는 기본키 설정을, autoincrement는 자동 번호 생성을 의미한다.
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    # String(50)은 VARCHAR(50)과 매핑되며, nullable=False는 NOT NULL 제약조건이다.
    title: Mapped[str] = mapped_column(String(50), nullable=False)

    # Text는 길이 제한이 없는 대용량 텍스트 저장에 적합하다.
    content: Mapped[str] = mapped_column(Text, nullable=False)