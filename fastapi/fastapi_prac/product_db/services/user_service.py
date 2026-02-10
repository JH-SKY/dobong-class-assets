from sqlalchemy.orm import Session
from product_db.models import User, WishList
from fastapi import HTTPException
from product_db.repositories.product_repository import product_repository
from product_db.schemas.user import UserCreate
from product_db.repositories.user_repository import user_repository


class UserService:
    def create_user(self, db: Session, data: UserCreate):
        # 해당 nickname을 가지고 있는 user가 있는지 확인해서
        # 있다면 raise exception

        new_user = User(nickname=data.nickname)
        with db.begin():
            user = user_repository.save(db, new_user)

        db.refresh(user)
        return user

    def read_users(self, db: Session):
        return user_repository.find_all(db)

    def add_wishlist(self, user_id: int, product_id, db: Session):
        # 1. 유저를 가져온다.
        # 2. product를 가져온다.
        # 3. 유저의 wishlist_items에 product를 append한다.
        # 4. 커밋한다.

        with db.begin():
            user = user_repository.find_by_id(user_id, db)
            if not user:
                raise HTTPException()

            product = product_repository.find_by_id(product_id, db)
            if not product:
                raise HTTPException()

            wishlist = WishList(user=user, product=product)
            # cascade를 활용해서 user - product의 연관테이블인 wishlist를 생성.
            # user.wishlist_items.append(product)
            user.wishlists.append(wishlist)

        return "성공"

    def read_wishlist(self, user_id: int, db: Session):
        # 1. user를 가져오고, 해당하는 product를 가져온다.
        # 2. product를 가져온다.where whilist.user_id = user_id인.
        # -> join이 필요해서 이따가 하도록 하겠습니다
        return user_repository.find_by_id(user_id, db)

    def read_wishlist_v2(self, user_id: int, db: Session):
        return product_repository.find_by_wishlist_user(user_id, db)

    def delete_wishlist(self, user_id: int, product_id: int, db: Session):
        with db.begin():
            user = user_repository.find_by_id(user_id, db)

            product = product_repository.find_by_id(product_id, db)

            user.wishlist_items.remove(product)
            # db.delete(WishList(user=user, product=product))

        return "성공"


user_service = UserService()
