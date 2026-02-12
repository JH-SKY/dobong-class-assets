# mysite4/services/user_service.py
from sqlalchemy.orm import Session
from mysite4.repositories.post2_repository import post2_repository
from mysite4.models.user import User


class UserService:
    def read_my_posts(self, db: Session, current_user: User):
        """내가 작성한 게시글 목록 조회"""
        return post2_repository.find_by_user_id(db, current_user.id)

    def read_posts_by_user_id(self, db: Session, user_id: int):
        """특정 유저가 작성한 게시글 목록 조회"""
        return post2_repository.find_by_user_id(db, user_id)


user_service = UserService()
