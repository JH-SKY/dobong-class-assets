# mysite4/repositories/post2_repository.py

from sqlalchemy.orm import Session, joinedload
from sqlalchemy import select
from mysite4.models.post2 import Post2
from mysite4.schemas.post2 import Post2Create


class Post2Repository:
    def save(self, db: Session, new_post: Post2):
        db.add(new_post)
        return new_post

    def find_all(self, db: Session):
        return db.scalars(select(Post2).options(joinedload(Post2.user))).all()

    def find_by_id(self, db: Session, id: int):
        return db.scalars(
            select(Post2).options(joinedload(Post2.user)).where(Post2.id == id)
        ).first()

    # mysite4/repositories/post2_repository.py (추가)

    def update(self, db: Session, post: Post2, data: Post2Create):
        post.title = data.title
        post.content = data.content
        return post

    def delete(self, db: Session, post: Post2):
        db.delete(post)

    # mysite4/repositories/post2_repository.py (추가)

    def find_by_user_id(self, db: Session, user_id: int):
        """특정 유저가 작성한 게시글 목록 조회"""
        return db.scalars(
            select(Post2)
            .options(joinedload(Post2.user))
            .where(Post2.user_id == user_id)
            .order_by(Post2.id)
        ).all()


post2_repository = Post2Repository()
