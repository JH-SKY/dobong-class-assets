from fastapi import FastAPI
from product.product_api import router
from product_adv.routers.product_router import router as product_router
from product_db.routers.product_router import router as product_db_router
from product_db.routers.category_router import router as category_db_router
from product_db.routers.user_router import router as user_db_router
from product_db.routers.user2_router import router as user2_db_router
from product_db.routers.auth_router import router as auth_db_router 


from database import Base, engine
from product_db import models 

# 기존 테이블 지우기
# Base.metadata.drop_all(bind=engine)

# 정의된 모델들을 기반으로 DB에 테이블을 생성한다.
Base.metadata.create_all(bind=engine)


app = FastAPI()

app.include_router(router)
app.include_router(product_router)
app.include_router(product_db_router)
app.include_router(category_db_router)
app.include_router(user_db_router)
app.include_router(user2_db_router)
app.include_router(auth_db_router)

@app.get("/")
def read_root():
    return {"Hello": "asd"}
