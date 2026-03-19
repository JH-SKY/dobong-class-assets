# main.py
import os
from datetime import datetime, timedelta, timezone

import bcrypt
import jwt
from dotenv import load_dotenv
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from fastapi.security import OAuth2PasswordBearer
from openai import OpenAI
from sqlalchemy import create_engine, select, String, Text, DateTime, ForeignKey, func
from sqlalchemy.orm import (
    Session,
    Mapped,
    mapped_column,
    DeclarativeBase,
    sessionmaker,
    relationship,
)

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# --- 1. DB 설정 ---
engine = create_engine("postgresql://postgres:1234@localhost:5432/post")
SessionLocal = sessionmaker(bind=engine)


class Base(DeclarativeBase):
    pass


# --- 2. 모델 정의 (설계도) ---


class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(200), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())

    posts: Mapped[list["Post"]] = relationship(back_populates="author")


class Post(Base):
    __tablename__ = "posts"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)

    author: Mapped["User"] = relationship(back_populates="posts")
    # [설계 의도]: 게시글 하나에 여러 댓글이 달릴 수 있도록 연결합니다.
    comments: Mapped[list["Comment"]] = relationship(
        back_populates="post", cascade="all, delete-orphan"
    )


class Comment(Base):
    __tablename__ = "comments"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    post_id: Mapped[int] = mapped_column(
        ForeignKey("posts.id", ondelete="CASCADE"), nullable=False
    )
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)

    post: Mapped["Post"] = relationship(back_populates="comments")
    author: Mapped["User"] = relationship()


class Conversation(Base):
    __tablename__ = "conversations"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    title: Mapped[str] = mapped_column(String(200), default="새 대화")
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())


class Message(Base):
    __tablename__ = "messages"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    conversation_id: Mapped[int] = mapped_column(
        ForeignKey("conversations.id", ondelete="CASCADE"), nullable=False
    )
    role: Mapped[str] = mapped_column(String(10), nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())


# [중요]: 모든 모델 정의가 끝난 후 테이블을 생성합니다.
Base.metadata.create_all(bind=engine)

# --- 3. FastAPI 설정 및 헬퍼 ---
app = FastAPI()
app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"]
)

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
EXPIRE_MINUTES = 3000
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode("utf-8"), hashed.encode("utf-8"))


def create_access_token(user_id: int) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=EXPIRE_MINUTES)
    payload = {"sub": str(user_id), "exp": expire}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def get_current_user(
    token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)
):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = int(payload.get("sub"))
    except jwt.InvalidTokenError, ValueError:
        raise HTTPException(status_code=401, detail="유효하지 않은 토큰입니다.")
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=401, detail="사용자를 찾을 수 없습니다.")
    return user


# --- 4. API 엔드포인트 ---


# [Auth API]
@app.post("/auth/signup", status_code=status.HTTP_201_CREATED)
def signup(data: dict, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == data["email"]).first()
    if existing:
        raise HTTPException(status_code=409, detail="이미 등록된 이메일입니다.")
    user = User(email=data["email"], password=hash_password(data["password"]))
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"id": user.id, "email": user.email}


@app.post("/auth/login")
def login(data: dict, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data["email"]).first()
    if not user or not verify_password(data["password"], user.password):
        raise HTTPException(
            status_code=401, detail="이메일 또는 비밀번호가 올바르지 않습니다."
        )
    return {"access_token": create_access_token(user.id)}


@app.get("/auth/me")
def get_me(current_user: User = Depends(get_current_user)):
    return {"id": current_user.id, "email": current_user.email}


# [Post API]
@app.get("/posts")
def get_posts(db: Session = Depends(get_db)):
    posts = db.scalars(select(Post).order_by(Post.created_at.desc())).all()
    return [
        {
            "id": p.id,
            "title": p.title,
            "author": p.author.email,
            "created_at": p.created_at,
        }
        for p in posts
    ]


@app.get("/posts/{post_id}")
def get_post(post_id: int, db: Session = Depends(get_db)):
    post = db.get(Post, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="게시글을 찾을 수 없습니다.")
    return {
        "id": post.id,
        "title": post.title,
        "content": post.content,
        "author": post.author.email,
        "created_at": post.created_at,
        "comments": [
            {"id": c.id, "content": c.content, "author": c.author.email}
            for c in post.comments
        ],
    }


@app.post("/posts", status_code=status.HTTP_201_CREATED)
def create_post(
    data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    post = Post(title=data["title"], content=data["content"], user_id=current_user.id)
    db.add(post)
    db.commit()
    db.refresh(post)
    return {"id": post.id, "title": post.title}


# [Comment API]
@app.post("/posts/{post_id}/comments")
def create_comment(
    post_id: int,
    data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    post = db.get(Post, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="게시글 없음")
    comment = Comment(content=data["content"], post_id=post_id, user_id=current_user.id)
    db.add(comment)
    db.commit()
    db.refresh(comment)
    return {"id": comment.id, "content": comment.content}


@app.delete("/comments/{comment_id}")
def delete_comment(
    comment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    comment = db.get(Comment, comment_id)
    if not comment or comment.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="삭제 권한 없음")
    db.delete(comment)
    db.commit()
    return {"message": "삭제 완료"}


# --- [Chat API] ---

# 1. [목록 조회] 설계 의도: 사이드바에 내 대화 목록을 쫙 보여줍니다. (반드시 POST보다 위에!)
@app.get("/conversations")
def get_conversations(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.scalars(
        select(Conversation)
        .where(Conversation.user_id == current_user.id)
        .order_by(Conversation.id.desc())
    ).all()

# 2. [대화방 생성] 비유: 채팅 시작 버튼을 누르면 새 '번호표'를 뽑는 곳입니다.
@app.post("/conversations")
def create_conversation(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    new_conv = Conversation(user_id=current_user.id)
    db.add(new_conv)
    db.commit()
    db.refresh(new_conv)
    return {"id": new_conv.id, "title": new_conv.title}

# 3. [메시지 조회] 설계 의도: 특정 방에 들어갔을 때 이전 대화 내용을 싹 긁어옵니다.
@app.get("/conversations/{conversation_id}/messages")
def get_messages(conversation_id: int, db: Session = Depends(get_db)):
    messages = db.scalars(
        select(Message)
        .where(Message.conversation_id == conversation_id)
        .order_by(Message.id.asc())
    ).all()
    return [{"role": m.role, "content": m.content} for m in messages]

# 4. [실시간 채팅] 비유: AI와 수돗물(Streaming)처럼 대화하고 DB에 자동 저장합니다.
@app.post("/conversations/{conversation_id}/chat")
async def ai_chat(
    conversation_id: int, 
    data: dict, 
    current_user: User = Depends(get_current_user), 
    db: Session = Depends(get_db)
):
    user_message = data.get("message")
    # 내 질문 저장
    db.add(Message(conversation_id=conversation_id, role="user", content=user_message))
    db.commit()

    # 문맥 파악을 위해 이전 대화 불러오기
    all_msgs = db.scalars(select(Message).where(Message.conversation_id == conversation_id).order_by(Message.created_at)).all()
    openai_msgs = [{"role": m.role, "content": m.content} for m in all_msgs]

    async def generate_ai_response():
        full_res = ""
        stream = client.chat.completions.create(model="gpt-4o-mini", messages=openai_msgs, stream=True)
        for chunk in stream:
            content = chunk.choices[0].delta.content
            if content:
                full_res += content
                yield f"data: {content}\n\n"
        
        # 답변 완료 후 DB 저장
        db.add(Message(conversation_id=conversation_id, role="assistant", content=full_res))
        db.commit()
        yield "data: [DONE]\n\n"

    return StreamingResponse(generate_ai_response(), media_type="text/event-stream")