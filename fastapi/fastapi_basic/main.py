from fastapi import FastAPI

from mysite.post_api import router as post_router
from mysite2.post_api import router as pydantic_router
from mysite3.routers.post_router import router as mvc_router
from mysite4.routers.post_router import router as db_router
from mysite4.routers.tag_router import router as tag_router

from database import engine
from mysite4 import models

# 기존 테이블 지우기
# models.Base.metadata.drop_all(bind=engine)

# 정의된 모델들을 기반으로 DB에 테이블을 생성한다.
models.Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(post_router)
app.include_router(pydantic_router)
app.include_router(mvc_router)
app.include_router(db_router)
app.include_router(tag_router)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/hello")
def hello():
    return "Hello World!"


@app.get("/hi")
def hi():
    return ["hello", "world", "!"]


@app.get("/odd")
def odd():
    result = []
    for i in range(100):
        if i % 2 == 0:
            result.append(i)

    return result
