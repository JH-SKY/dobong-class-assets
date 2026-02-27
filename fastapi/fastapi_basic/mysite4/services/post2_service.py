# mysite4/services/post2_service.py
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from mysite4.repositories.post2_repository import post2_repository
from mysite4.models.post2 import Post2
from mysite4.schemas.post2 import Post2Create
from mysite4.models.user import User
from mysite4.exceptions import NotFoundException


class Post2Service:
    def create_post(self, db: Session, data: Post2Create, current_user: User):
        # 로그인한 유저의 ID를 자동으로 설정한다.

        new_post = Post2(title=data.title, content=data.content, user=current_user)

        post2_repository.save(db, new_post)
        db.commit()
        db.refresh(new_post)
        return new_post

    def read_posts(self, db: Session):
        return post2_repository.find_all(db)

    def read_post_by_id(self, db: Session, id: int):
        post = post2_repository.find_by_id(db, id)
        if not post:
            # raise HTTPException(
            #     status.HTTP_404_NOT_FOUND, "존재하지 않는 게시글입니다."
            # )
            raise NotFoundException("존재하지 않는 게시글입니다!!!!!!!")
        return post

    # mysite4/services/post2_service.py (추가)

    def update_post(self, db: Session, id: int, data: Post2Create, current_user: User):
        post = self.read_post_by_id(db, id)

        # 작성자 본인만 수정 가능
        if post.user_id != current_user.id:
            raise HTTPException(
                status.HTTP_403_FORBIDDEN, "본인의 게시글만 수정할 수 있습니다."
            )

        updated_post = post2_repository.update(db, post, data)
        db.commit()
        db.refresh(updated_post)
        return updated_post

    def delete_post(self, db: Session, id: int, current_user: User):
        post = self.read_post_by_id(db, id)

        # 작성자 본인만 삭제 가능
        if post.user_id != current_user.id:
            raise HTTPException(
                status.HTTP_403_FORBIDDEN, "본인의 게시글만 삭제할 수 있습니다."
            )

        post2_repository.delete(db, post)
        db.commit()


post2_service = Post2Service()
