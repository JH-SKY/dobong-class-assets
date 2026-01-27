
# 상품 클래스
class Product :
    def __init__(self, name, price, stock):
        self.name = name
        self.price = price
        self.stock = stock

    def __str__(self):
        return f'"{self.name} : {self.price}원 (재고 : {self.stock}개)"'

# 결제 시스템 클래스    
from abc import ABC, abstractmethod    

class Payment(ABC):
    @abstractmethod
    def process_payment (self, amount):
        pass

# 현금 결제
class CashPayment(Payment):

    def __init__(self, received_amount) :
        self.received_amount = received_amount

    def process_payment (self, amount) :
        if self.received_amount >= amount:
            return True
        else:
            return False

# 카드 결제
class CardPayment(Payment):

    def __init__(self, card_limit):
        self.card_limit = card_limit

    def process_payment (self, amount):
        if self.card_limit >= amount:
            return True
        else:
            return False
        
# 자판기 클레스

class VendingMachine :
    def __init__(self):
        self.inventory = []

    # 상품 등록
    def add_product(self, product):
        self.inventory.append(product)
        
    # 상품목록 출력    
    def display_menu(self):
        for product in self.inventory:
            print(product)
    
    # 상품 배출
    def dispense_product(self, product_name, payment_method):
        for product in self.inventory:
            if product.name == product_name :
                if product.stock > 0 :
                    if payment_method.process_payment(product.price):
                        product.stock -= 1
                        print(f'{product}이 배출되었습니다.')
                    else:
                        print('결제에 실패하였습니다.')
                else:
                    print('재고가 부족합니다.')
                return
        print('상품을 찾을수 없습니다.')


# 테스트 시나리오
# --- 1. 자판기 설치 및 상품 등록 ---
vending_machine = VendingMachine()

coke = Product("콜라", 1500, 2)
water = Product("생수", 800, 1)

vending_machine.add_product(coke)
vending_machine.add_product(water)

# --- 2. 목록 확인 ---
print("1. [목록 확인]")
vending_machine.display_menu()
print("-" * 30)

# --- 3. 현금 결제 테스트 ---
print("2. [현금 결제 테스트]")
# 투입 금액 1000원
cash_1000 = CashPayment(1000)
print("시도: 1000원으로 콜라 구매")
vending_machine.dispense_product("콜라", cash_1000)

# 투입 금액 2000원
cash_2000 = CashPayment(2000)
print("\n시도: 2000원으로 콜라 구매")
vending_machine.dispense_product("콜라", cash_2000)
print("-" * 30)

# --- 4. 카드 결제 테스트 ---
print("3. [카드 결제 테스트]")
# 한도 500원 카드
poor_card = CardPayment(500)
print("시도: 한도 500원 카드로 생수 구매")
vending_machine.dispense_product("생수", poor_card)

# 한도 10000원 카드
rich_card = CardPayment(10000)
print("\n시도: 한도 10000원 카드로 생수 구매")
vending_machine.dispense_product("생수", rich_card)
print("-" * 30)

# --- 5. 품절 테스트 ---
print("4. [품절 테스트]")
print("시도: 재고가 0인 생수 다시 구매")
# 아까 생수 1개를 이미 샀으므로 재고는 0인 상태입니다.
vending_machine.dispense_product("생수", rich_card)
print("-" * 30)

# --- 최종 상태 확인 ---
print("5. [최종 재고 확인]")
vending_machine.display_menu()