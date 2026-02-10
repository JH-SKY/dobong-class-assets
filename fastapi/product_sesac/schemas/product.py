from pydantic import BaseModel, ConfigDict, Field, ValidationInfo, field_validator
from schemas.category import CategoryReadResponse


class ProductCreateRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=50, alias="product_name")
    price: int = Field(..., ge=100)
    discount_price: int = Field(..., ge=0)
    stock: int = Field(ge=0, default=10)
    category: str

    @field_validator("discount_price")
    @classmethod
    def check_discount_less_than_price(cls, v: int, info: ValidationInfo) -> int:
        if "price" in info.data and v >= info.data["price"]:
            raise ValueError("discout가 price보다 높아서는 안되.")
        return v

class ProductListResponse(BaseModel):
    id: int
    name: str
    final_price: int
    category: CategoryReadResponse

    model_config = ConfigDict(from_attributes=True)


class ProductDetailResponse(ProductListResponse):
    is_sold_out : bool
    stock : int

class ProductUpdateRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=50, alias="product_name")
    price: int = Field(..., ge=100)
    discount_price: int = Field(..., ge=0)
    stock: int = Field(ge=0, default=10)
    category: str

    @field_validator("discount_price")
    @classmethod
    def check_discount_less_than_price(cls, v: int, info: ValidationInfo) -> int:
        if "price" in info.data and v >= info.data["price"]:
            raise ValueError("discout가 price보다 높아서는 안되.")
        return v