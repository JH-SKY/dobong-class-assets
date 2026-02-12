from fastapi import FastAPI
from database import engine, Base 
# import models
from routers.product_router import router as product_router
from routers.category_router import router as category_router
# 기존 테이블 지우기
# Base.metadata.drop_all(bind=engine)

# 정의된 모델들을 기반으로 DB에 테이블을 생성한다.
Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(product_router)
app.include_router(category_router)