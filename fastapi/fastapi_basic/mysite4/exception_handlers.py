# mysite4/exception_handlers.py
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError

from mysite4.exceptions import AppException


def register_exception_handlers(app: FastAPI):
    """앱에 예외 핸들러들을 등록하는 함수"""

    @app.exception_handler(AppException)
    async def app_exception_handler(request: Request, exc: AppException):
        return JSONResponse(
            status_code=exc.status_code,
            content={"detail": exc.detail},
        )

    @app.exception_handler(RequestValidationError)
    async def validation_handler(request: Request, exc: RequestValidationError):
        """Pydantic 검증 실패 시 에러 메시지를 간결하게 변환"""
        errors = exc.errors()
        first_error = errors[0]
        field = " → ".join(str(loc) for loc in first_error["loc"])
        message = first_error["msg"]

        return JSONResponse(
            status_code=422,
            content={"detail": f"{field}: {message}"},
        )

    # 나중에는 우선 주석처리하고 개발을 진행하고요
    # 직접 배포해서 사람들이 사용할 때 주석을 해제해서 보여준다.
    @app.exception_handler(Exception)
    async def unhandled_exception_handler(request: Request, exc: Exception):
        return JSONResponse(
            status_code=500, content={"detail": "서버 내부 오류가 발생했습니다."}
        )
