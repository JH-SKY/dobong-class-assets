from 설계 import Book, Member, Librarian, Library

# # 1. 시립 도서관 네트워크 및 인원 세팅
# gangnam = Library("강남 시립 도서관")
# hongdae = Library("홍대 시립 도서관")
# jeju = Library("제주 시립 도서관")

# admin = Librarian("최사서", "E-001")
# member = Member("박지성", "M-001")

# # 2. 각 지점에 도서 등록 (사서 권한 사용)
# b1 = Book("파이썬 기초", "강작가", "ISBN-001")
# b2 = Book("클린 코드", "로버트", "ISBN-002")
# b3 = Book("자료구조", "박교수", "ISBN-003")
# b4 = Book("인공지능", "최박사", "ISBN-004") # 홍대 도서관용
# b5 = Book("제주 여행기", "고작가", "ISBN-005") # 제주 도서관용

# admin.register_book(gangnam, b1)
# admin.register_book(gangnam, b2)
# admin.register_book(gangnam, b3)
# admin.register_book(hongdae, b4)
# admin.register_book(jeju, b5)

# print("\n" + "="*50)
# print("테스트 1: [통합 대출 한도] 강남에서 3권을 모두 빌린 경우")
# print("="*50)
# gangnam.process_loan(member, b1)
# gangnam.process_loan(member, b2)
# gangnam.process_loan(member, b3)

# print("\n" + "="*50)
# print("테스트 2: [지점 이동 대출] 강남 한도 초과 후 홍대에서 대출 시도")
# print("="*50)
# # 박지성 님은 이미 시립 통합 한도 3권을 채웠으므로, 홍대에서도 빌릴 수 없어야 함
# hongdae.process_loan(member, b4)

# print("\n" + "="*50)
# print("테스트 3: [교차 반납 방지] 강남 책을 제주 도서관에 반납 시도")
# print("="*50)
# # b1은 강남 도서관 자산이므로 제주 도서관에서 반납을 거절해야 함
# jeju.process_return(member, b1)

# print("\n" + "="*50)
# print("테스트 4: [정상 반납 후 한도 복구] 강남 책 반납 후 제주 책 대출")
# print("="*50)
# gangnam.process_return(member, b1) # 강남에 반납
# jeju.process_loan(member, b5)     # 이제 통합 한도에 여유가 생겨 제주에서 빌릴 수 있음

# print("\n" + "="*50)
# print("테스트 5: [최종 조회] 각 지점별 도서 현황")
# print("="*50)
# gangnam.show_all_books()
# hongdae.show_all_books()
# jeju.show_all_books()


# book = Book('a','b','c')
# print(book.is_available)
# user = Member('user', 1)

# user.add_book(book) #내가 책 빌리기
# print(book.is_available)