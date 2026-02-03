from fastapi import APIRouter
from .product import ProductModel, Product

products = []
product_id = 0
router = APIRouter(prefix="/products", tags=["Product"])


@router.post("")
def create_product(product_data: ProductModel):
    global product_id
    product_id += 1

    product = Product(product_id, product_data.name, product_data.price)

    products.append(product)
    return product


@router.get("")
def read_products():
    # 저장된 모든 제품 반환
    return products


@router.get("/{id}")
def read_product(id: int):
    # 식별자가 일치하는 데이터를 리스트에서 탐색
    for product in products:
        if product.id == id:
            return product
    return {"message": "데이터를 찾을 수 없습니다."}


@router.put("/{id}")
def update_product(id: int, updated_product: ProductModel):
    for product in products:
        if product.id == id:
            # 전달받은 객체의 필드값으로 기존 데이터 갱신
            product.name = updated_product.name
            product.price = updated_product.price
            return product
    return {"message": "수정할 대상이 없습니다."}


@router.delete("/{id}")
def delete_product(id: int):
    for index, product in enumerate(products):
        if product.id == id:
            # 해당 인덱스의 요소를 추출하여 제거
            return products.pop(index)
    return {"message": "삭제할 대상이 없습니다."}
