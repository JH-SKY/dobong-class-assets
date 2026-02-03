from fastapi import FastAPI
from mysite.product_api import router as product_router

app = FastAPI()
app.include_router(product_router)


@app.get("/")
def read_root():
    return {"Hello": "World"}
