from fastapi import FastAPI
from product.product_api import router
from product_adv.routers.product_router import router as product_router
from product_db.routers.product_router import router as product_db_router
from product_db.routers.category_router import router as category_db_router

from database import engine
from product_db import models

models.Base.metadata.create_all(bind=engine)


app = FastAPI()

app.include_router(router)
app.include_router(product_router)
app.include_router(product_db_router)
app.include_router(category_db_router)


@app.get("/")
def read_root():
    return {"Hello": "asd"}
