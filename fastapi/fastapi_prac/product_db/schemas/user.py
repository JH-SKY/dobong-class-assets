# schemas/User.py

from pydantic import BaseModel, ConfigDict
from product_db.schemas.product import ProductResponse


class UserCreate(BaseModel):
    nickname: str


class UserResponse(BaseModel):
    id: int
    nickname: str

    model_config = ConfigDict(from_attributes=True)


class UserDetailResponse(BaseModel):
    id: int
    nickname: str

    wishlist_items: list[ProductResponse]

    model_config = ConfigDict(from_attributes=True)
