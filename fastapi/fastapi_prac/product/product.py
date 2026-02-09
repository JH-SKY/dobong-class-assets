from pydantic import BaseModel
class Product:
    def __init__(self, id, name, price):
        self.id = id
        self.name = name
        self.price = price

class ProductCreate(BaseModel):
    name: str
    price: int
