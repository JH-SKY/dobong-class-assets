from fastapi import APIRouter
from .product import Product, ProductCreate

router = APIRouter(prefix="/products")

products = []
product_id = 0


@router.post("")
def create_product(data: ProductCreate):
    global product_id
    product_id += 1

    product = Product(product_id, data.name, data.price)

    products.append(product)

    return product


# 조회
@router.get("")
def read_products():
    return products


# 단일조회
@router.get("/{id}")
def read_products_by_id(id: int):
    # id를 통해 product 가져오기
    for product in products:
        if product.id == id:
            return product
    return {"message": "데이터를 찾을 수 없습니다."}


# 단일 수정
@router.put("/{id}")
def update_product(id: int, data: ProductCreate):
    # id를 통해 product 가져오고
    # 입력받은 정보를 바탕으로 수정한다.
    for product in products:
        if product.id == id:
            product.name = data.name
            product.price = data.price
            return product
    return {"message": "수정할 대상이 없습니다."}


@router.delete("/{id}")
def delete_product(id: int):
    for index, product in enumerate(products):
        if product.id == id:
            # 해당 인덱스의 요소를 추출하여 제거
            return products.pop(index)
    return {"message": "삭제할 대상이 없습니다."}
