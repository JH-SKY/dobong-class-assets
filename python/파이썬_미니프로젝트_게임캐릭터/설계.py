from abc import ABC, abstractmethod

# --- 1. 무기 설계도 (부모 클래스) ---
class Weapon(ABC):
    def __init__(self, name, special_skill_name):
        self.name = name                      # 무기의 이름 (예: 엑스칼리버)
        self.special_skill_name = special_skill_name  # 무기의 필살기 이름

    @abstractmethod
    def use_special_skill(self):
        """무기마다 다른 필살기 동작을 정의합니다."""
        pass

# --- 2. 실제 무기들 (자식 클래스) ---
class Sword(Weapon):
    def use_special_skill(self):
        return f"강력한 {self.special_skill_name} 베기 공격!"

class Staff(Weapon):
    def use_special_skill(self):
        return f"화려한 {self.special_skill_name} 마법 폭발!"

# --- 3. 직업 설계도 (부모 클래스) ---
class Job(ABC):
    @abstractmethod
    def allowed_weapons(self): # 허용된 무기 리스트 규칙
        pass

    @abstractmethod
    def alttack_stye(self):    # 공격 방식 규칙
        pass

# --- 4. 실제 직업들 (자식 클래스) ---
class Warrior(Job):
    def allowed_weapons(self):
        return ["Sword"]  # 전사는 검(Sword) 종류만 쓸 수 있어요

    def attack_style(self):
         return "검을 휘두르며달려나갑니다"

class Mage(Job):
    def allowed_weapons(self):
        return ["Staff"]  # 마법사는 지팡이(Staff) 종류만 쓸 수 있어요

    def attack_style(self):
        return "마법 주문을 외웁니다"

# --- 5. 캐릭터 클래스 (주인공) ---
class Character:
    def __init__(self, name, job_object):
        self.name = name
        self.job = job_object           # 전달받은 직업 객체 저장
        self.equipped_weapon = None     # 처음엔 맨손 상태 (None)

    def equip(self, weapon):
        """무기를 장착하는 함수입니다."""
        # 장착하려는 무기의 클래스 이름(Sword 등)이 허용 리스트에 있는지 확인합니다.
        weapon_type = type(weapon).__name__
        
        if weapon_type in self.job.allowed_weapons():
            self.equipped_weapon = weapon
            print(f"{self.name}: '{weapon.name}'은(는) 제가 잘 다루는 거죠! (장착 완료)")
        else:
            print(f"{self.name}: '{weapon_type}'은(는) 내 역할에 맞지 않아요. (장착 거절)")

    def attack(self):
        """공격 명령을 내리는 함수입니다."""
        if self.equipped_weapon:
            print(f"{self.name}이(가) {self.equipped_weapon.name}를 들고 {self.job.attack_style()}!")
        else:
            print(f"{self.name}: 손에 든 게 없어서 공격할 수 없습니다.")

    def use_weapon_skill(self):
        """필살기를 쓰는 함수입니다."""
        if self.equipped_weapon:
            # 장착된 무기가 가진 필살기 기능을 실행합니다.
            print(f"{self.name}의 필살기! {self.equipped_weapon.use_special_skill()}")
        else:
            print(f"{self.name}: 지금 내 손에 든 게 없는데 무엇을 쓰나요? (당황)")

# --- 6. 실제 상황 시뮬레이션 (아더의 이야기) ---

# 1. 아더라는 이름의 전사 탄생
arthur = Character("아더", Warrior()) 

# 2. 지팡이 장착 시도 (실패 상황)
magic_staff = Staff("나무 지팡이", "불꽃")
arthur.equip(magic_staff)

# 3. 검 장착 시도 (성공 상황)
cool_sword = Sword("전설의 검", "연속")
arthur.equip(cool_sword)

# 4. 공격 및 필살기 시전
arthur.attack()
arthur.use_weapon_skill()