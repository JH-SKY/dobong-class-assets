from pydantic import BaseModel


class ProductModel(BaseModel):
    name: str
    price: int


class Product:
    def __init__(self, id, name, price):
        self.id = id
        self.name = name
        self.price = price
