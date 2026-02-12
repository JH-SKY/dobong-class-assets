# schemas/user.py

from datetime import datetime
from pydantic import BaseModel, ConfigDict, EmailStr


class UserCreate(BaseModel):
    email: EmailStr
    password: str
    nickname: str

class UserResponse(BaseModel):
    id: int
    email: str
    nickname: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


# schemas/user.py에 로그인 관련 스키마를 추가한다.
class UserLogin(BaseModel):
    email: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
