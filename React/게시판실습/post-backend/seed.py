from main import SessionLocal, User, Post, hash_password
from sqlalchemy import select

def seed_data():
    db = SessionLocal()
    try:
        # 1. 테스트 유저 확인 및 생성
        test_email = "test@test.com"
        user = db.query(User).filter(User.email == test_email).first()
        
        if not user:
            print("비유: 새 손님(테스트 계정)을 등록합니다.")
            user = User(email=test_email, password=hash_password("1234"))
            db.add(user)
            db.commit()
            db.refresh(user)
        
        # 2. 게시글 데이터 밀어넣기 (비유: 진열대에 가짜 상품을 올립니다)
        dummy_posts = [
            {"title": "첫 번째 게시글입니다", "content": "안녕하세요, 첫 번째 글이에요!"},
            {"title": "리액트 공부 중이에요", "content": "비전공자도 할 수 있다! 화이팅!"},
            {"title": "FastAPI와 PostgreSQL 연결 성공", "content": "이제 프론트엔드만 완성하면 되겠네요."},
        ]

        for p_data in dummy_posts:
            # 설계 의도: 중복 생성을 방지하기 위해 제목으로 체크합니다.
            existing_post = db.query(Post).filter(Post.title == p_data["title"]).first()
            if not existing_post:
                post = Post(
                    title=p_data["title"], 
                    content=p_data["content"], 
                    user_id=user.id
                )
                db.add(post)
        
        db.commit()
        print("✅ 데이터 밀어넣기 성공! 이제 프론트엔드 목록을 확인해보세요.")

    except Exception as e:
        print(f"❌ 에러 발생: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()