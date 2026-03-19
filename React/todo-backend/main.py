# main.py
from datetime import datetime, timedelta, timezone

import bcrypt
import jwt
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy import create_engine, select, String, DateTime, func
from sqlalchemy.orm import (
    Session,
    Mapped,
    mapped_column,
    DeclarativeBase,
    sessionmaker,
)

# --- DB 설정 ---

engine = create_engine("postgresql://postgres:1234@localhost:5432/todo")
SessionLocal = sessionmaker(bind=engine)


class Base(DeclarativeBase):
    pass


# --- FastAPI 설정 ---

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

SECRET_KEY = "your-secret-key"  # 실제 서비스에서는 환경변수로 관리해야 한다
ALGORITHM = "HS256"
EXPIRE_MINUTES = 3000  # 약 2일 - 수업 편의를 위해 길게 설정

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# --- 모델 ---


class Todo(Base):
    __tablename__ = "todos"

    id: Mapped[int] = mapped_column(primary_key=True)
    text: Mapped[str]
    done: Mapped[bool] = mapped_column(default=False)


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(200), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, server_default=func.now(), nullable=False
    )


Base.metadata.create_all(bind=engine)


# --- 헬퍼 함수 ---


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
    except (jwt.InvalidTokenError, ValueError):
        raise HTTPException(status_code=401, detail="유효하지 않은 토큰입니다.")

    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=401, detail="사용자를 찾을 수 없습니다.")
    return user


# --- Todo API (기존) ---


@app.get("/todos")
def get_todos(db: Session = Depends(get_db)):
    stmt = select(Todo).order_by(Todo.id)
    return db.scalars(stmt).all()


@app.post("/todos")
def create_todo(data: dict, db: Session = Depends(get_db)):
    todo = Todo(text=data["text"])
    with db.begin():
        db.add(todo)
    db.refresh(todo)
    return todo


@app.put("/todos/{todo_id}")
def update_todo(todo_id: int, data: dict, db: Session = Depends(get_db)):
    with db.begin():
        todo = db.scalar(select(Todo).where(Todo.id == todo_id))
        todo.text = data["text"]
    db.refresh(todo)
    return todo


@app.put("/todos/{todo_id}/toggle")
def toggle_todo(todo_id: int, db: Session = Depends(get_db)):
    with db.begin():
        todo = db.scalar(select(Todo).where(Todo.id == todo_id))
        todo.done = not todo.done
    db.refresh(todo)
    return todo


@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    with db.begin():
        todo = db.scalar(select(Todo).where(Todo.id == todo_id))
        db.delete(todo)
    return {"message": "삭제 완료"}


# --- Auth API (추가) ---


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

    token = create_access_token(user.id)
    return {"access_token": token}


@app.get("/auth/me")
def get_me(current_user: User = Depends(get_current_user)):
    return {"id": current_user.id, "email": current_user.email}


# main.py - 기존 코드에 추가할 부분

# --- import 추가 ---
from fastapi.responses import StreamingResponse
import time


# --- Chat API (추가) ---


def generate_message():
    """글자를 하나씩 보내는 제너레이터"""
    message = "안녕하세요! 저는 AI 어시스턴트입니다. 무엇을 도와드릴까요?"

    for char in message:
        yield f"data: {char}\n\n"
        time.sleep(0.1)  # 0.1초 간격으로 전송

    yield "data: [DONE]\n\n"


# @app.post("/chat")
# def chat():
#     return StreamingResponse(
#         generate_message(),
#         media_type="text/event-stream",
#     )


def generate_response(message: str):
    """사용자 메시지에 따라 응답을 스트리밍하는 제너레이터"""
    response = f"'{message}'에 대한 답변입니다. 이것은 스트리밍 테스트 응답입니다!"

    for char in response:
        yield f"data: {char}\n\n"
        time.sleep(0.1)

    yield "data: [DONE]\n\n"


@app.post("/chat")
def chat(body: dict):
    return StreamingResponse(
        generate_response(body["message"]),
        media_type="text/event-stream",
    )
