# ==========================================
# 시립 도서관 통합 관리 시스템 (Library System)
# ==========================================


# 1. [Book] 도서의 정보를 관리하는 클래스
class Book:
    def __init__(self, title, author, isbn: str):
        self.title = title          # 도서 제목
        self.author = author        # 저자
        self.isbn = isbn            # 고유 식별 번호
        self.is_available = True    # 대출 가능 상태 (기본값: True)
        self.is_deleted = False     # 시스템 삭제 여부 (Soft Delete용)

    def borrow(self):
        """대출 처리: 도서 상태를 불가능으로 변경"""
        self.is_available = False

    def return_book(self):
        """반납 처리: 도서 상태를 가능으로 변경"""
        self.is_available = True

# 2. [User] 사용자 공통 속성을 정의하는 부모 클래스
class User:
    def __init__(self, name):
        self.name = name

# 3. [Member] 시립 도서관 연합 회원 클래스
class Member(User):
    def __init__(self, name, member_id):
        super().__init__(name)
        self.member_id = member_id
        self.borrowed_books = []    # 시립 통합 시스템에서 관리되는 사용자의 전체 대출 목록

    def add_book(self, book: Book):
        """사용자의 통합 대출 목록에 도서 추가"""
        self.borrowed_books.append(book)
        print(f"[통합시스템] {self.name}님의 대출 목록에 '{book.title}'이(가) 추가되었습니다.")

    def remove_book(self, book: Book):
        """사용자의 통합 대출 목록에서 도서 제거"""
        self.borrowed_books.remove(book)
        print(f"[통합시스템] {self.name}님의 대출 목록에서 '{book.title}'이(가) 삭제되었습니다.")

# 4. [Librarian] 관리 권한을 가진 사서 클래스
class Librarian(User):
    def __init__(self, name, employee_id):
        super().__init__(name)
        self.employee_id = employee_id
        self.is_admin = True        # 관리자 권한 플래그 (중요)

    def register_book(self, library_obj, book: Book):
        """도서관 객체에 신분증(self)을 제시하며 도서 등록 요청"""
        library_obj.add_book(self, book)

    def remove_book(self, library_obj, book: Book):
        """도서관 객체에 신분증(self)을 제시하며 도서 삭제 요청"""
        library_obj.remove_book(self, book)

# 5. [Library] 개별 도서관 지점 및 대출 로직 관리 클래스
class Library:
    def __init__(self, name):
        self.name = name            # 도서관 지점 이름 (예: 강남, 홍대)
        self.books = []             # 해당 지점이 보유한 도서 목록
        self.LOAN_LIMIT = 3         # 시립 도서관 통합 규정: 인당 최대 3권

    def add_book(self, requester, book):
        """지점 도서 등록 (사서 권한 검증 필수)"""
        # getattr를 사용하여 requester에게 'is_admin' 속성이 있는지 확인
        if not getattr(requester, 'is_admin', False):
            print(f"권한 오류: {requester.name}님은 도서를 등록할 권한이 없습니다.")
            return
        self.books.append(book)
        print(f"[{self.name}] 신규 도서 '{book.title}'이(가) 성공적으로 등록되었습니다.")

    def remove_book(self, requester, book):
        """지점 도서 삭제 (권한, 자산 여부, 대출 상태 확인)"""
        # 1. 권한 체크
        if not getattr(requester, 'is_admin', False):
            print(f"권한 오류: {requester.name}님은 도서를 삭제할 권한이 없습니다.")
            return
        
        # 2. 우리 지점 자산인지 체크
        if book not in self.books:
            print(f"삭제 실패: '{book.title}'은(는) {self.name} 소속의 도서가 아닙니다.")
            return
        
        # 3. 대출 중인지 체크 (대출 중인 책은 삭제 불가)
        if not book.is_available:
            print(f"삭제 불가: '{book.title}'은(는) 현재 대출 중인 도서입니다.")
            return
        
        self.books.remove(book)
        print(f"[{self.name}] 도서 '{book.title}'이(가) 시스템에서 영구 삭제되었습니다.")

    def show_all_books(self):
        """해당 지점의 전체 도서 현황 출력"""
        print(f"\n--- {self.name} 보유 도서 목록 ---")
        if not self.books:
            print("현재 보유 중인 도서가 없습니다.")
            return
        for book in self.books:
            status = "대출 가능" if book.is_available else "대출 중"
            print(f"- {book.title} ({book.author}) | 상태: {status} | ISBN: {book.isbn}")

    def show_available_books(self):
        """해당 지점에서 지금 바로 빌릴 수 있는 도서 필터링 (List Comprehension)"""
        available_list = [book for book in self.books if book.is_available]
        print(f"\n--- {self.name} 대출 가능 목록 ---")
        for book in available_list:
            print(f"- {book.title} ({book.author})")

    def process_loan(self, member, book):
        """통합 대출 처리 (책 상태 및 통합 한도 검증)"""
        # 1. 도서 가용성 확인
        if not book.is_available:
            print(f"대출 실패: '{book.title}'은(는) 이미 대출 중입니다.")
            return
        
        # 2. 시립 통합 대출 한도 체크 (어느 지점에서 빌렸든 상관없이 합산)
        if len(member.borrowed_books) >= self.LOAN_LIMIT:
            print(f"대출 거부: {member.name}님은 시립 도서관 통합 한도({self.LOAN_LIMIT}권)를 초과했습니다.")
            return
        
        # 3. 대출 실행
        book.borrow()           
        member.add_book(book)    
        print(f"대출 완료: {member.name}님이 {self.name}에서 '{book.title}'을(를) 빌렸습니다.")

    def process_return(self, member, book):
        """반납 처리 (지점 자산 여부 및 회원 대출 목록 검증)"""
        # 1. 우리 지점 책이 맞는지 확인 (데이터 무결성)
        if book not in self.books:
            print(f"반납 오류: '{book.title}'은(는) {self.name}의 도서가 아닙니다. 해당 지점에 반납해 주세요.")
            return
        
        # 2. 해당 회원이 실제로 빌린 책이 맞는지 확인
        if book in member.borrowed_books:
            book.return_book()
            member.remove_book(book) 
            print(f"반납 완료: {member.name}님이 '{book.title}'을(를) {self.name}에 반납했습니다.")
        else:
            print(f"반납 실패: {member.name}님의 대출 목록에 이 도서가 존재하지 않습니다.")


### 권한 관리 : 신분증 확인getattr을 이용해 사서(is_admin)만 도서 등록/삭제 가능
### 재고 관리 
# 도서 등록 : 사서가 도서관 객체에 새로운 책 인스턴스를 추가
# 도서 삭제 : 도서관 목록에 있고, 대출 중이 아닌 책만 삭제 가능
### 조회 시스템
# 전체 목록 : 보유 중인 모든 책의 제목, 저자, ISBN, 대출 상태 출력
# 가용 도서 조회 : 리스트 컴프리헨션으로 is_available이 True인 책만 필터링
### 트랜잭션
# 대출 실행 : 3중 필터: 대출 가능 여부 확인 -> 대출 한도(3권) 확인 -> 상태 변경
# 반납 실행 : 2중 검증: 우리 도서관 책인지 확인 -> 회원이 빌린 책인지 확인

