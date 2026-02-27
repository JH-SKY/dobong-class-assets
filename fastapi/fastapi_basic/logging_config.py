# logging_config.py
import logging
from logging.handlers import RotatingFileHandler


def setup_logging():
    """앱 전체 로깅 설정"""

    formatter = logging.Formatter(
        fmt="%(asctime)s %(levelname)-8s %(name)s - %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    )

    # 1. 콘솔 핸들러 (기존과 동일)
    console_handler = logging.StreamHandler()
    console_handler.setFormatter(formatter)

    # 2. 파일 핸들러 (새로 추가)
    file_handler = RotatingFileHandler(
        filename="app.log",       # 로그 파일 이름
        maxBytes=10 * 1024 * 1024, # 파일 최대 크기: 10MB
        backupCount=5,             # 백업 파일 최대 5개 유지
        encoding="utf-8",
    )
    file_handler.setFormatter(formatter)

    # 루트 로거 설정
    root_logger = logging.getLogger()
    root_logger.setLevel(logging.INFO)
    root_logger.addHandler(console_handler)
    root_logger.addHandler(file_handler)  # 파일 핸들러 추가

    logging.getLogger("sqlalchemy.engine").setLevel(logging.WARNING)
    logging.getLogger("watchfiles").setLevel(logging.WARNING)