# mysite4/services/user_service.py
from sqlalchemy.orm import Session
from product_db.models.wishlist2 import WishList2
from product_db.repositories.product_repository import product_repository
from product_db.models.user2 import User2


class User2Service:
    def read_my_posts(self, db: Session, current_user: User2):
        """내가 작성한 게시글 목록 조회"""
        return product_repository.find_by_user_id(db, current_user.id)

    def read_posts_by_user_id(self, db: Session, user_id: int):
        """특정 유저가 작성한 게시글 목록 조회"""
        return product_repository.find_by_user_id(db, user_id)

    def read_wishlist_by_user_id(self, db: Session, user_id: int):
        """특정 유저가 찜한상품 목록 조회"""
        return product_repository.find_wishlist_by_user_id(db, user_id)
    
    def add_to_wishlist(self, db: Session, user_id: int, product_id: int):
        """찜하기"""
        return product_repository.add_to_wishlist(db, user_id, product_id)
    def remove_from_wishlist(self, db: Session, user_id: int, product_id: int):
        """찜하기 취소"""
        wishlist_entry = db.query(WishList2).filter_by(user_id=user_id, product_id=product_id).first()
        if wishlist_entry:
            db.delete(wishlist_entry)
            db.commit()
            return {"찜하기 취소 완료"}
        else:
            return {"찜하기 취소 실패: 찜한 상품이 아닙니다."}



    
user2_service = User2Service()
