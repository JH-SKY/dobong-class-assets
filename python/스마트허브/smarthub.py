# [1. 스마트 허브 클래스]: 시스템의 컨트롤 타워 역할
from abc import ABC, abstractmethod

class Smarthub:
    def __init__(self, name, protocol):
        self.name = name
        self.protocol = protocol  # 허브가 지원하는 통신 방식 (WiFi 혹은 Zigbee 객체)
        self.devices = []         # 연결된 기기들을 담는 리스트 (객체 합성)

    def register_device(self, device):
        # 호환성 검사: 기기의 통신 방식 타입과 허브의 통신 방식 타입이 일치하는지 확인
        if type(device.protocol) == type(self.protocol):
            self.devices.append(device)
            print(f'[{device.name}] 등록 성공')
            # 실무 팁: 성공 시 로그를 남겨두면 나중에 디버깅하기 편해
        else:
            # 일치하지 않으면 리스트에 넣지 않고 경고 메시지 출력
            print('호환되지 않는 연결 방식입니다.')

    def activate_all(self):
        # 다형성 활용: 리스트에 담긴 기기가 무엇이든 공통된 메서드로 제어
        for device in self.devices:
            # 1단계: 기기에 할당된 프로토콜을 이용해 먼저 통신 연결
            device.protocol.start_connection()
            # 2단계: 연결 성공 후 기기 작동
            device.turn_on()

    def deactivate_all(self):
        for device in self.devices:
            device.turn_off()

# [2. 기기 추상 클래스]: 모든 스마트 기기의 공통 규격(인터페이스)
class Device(ABC):
    def __init__(self, name, brand, protocol):
        self.name = name          # 기기 개별 명칭 (예: 거실 전등)
        self.brand = brand        # 브랜드 (예: 필립스)
        self.protocol = protocol  # 해당 기기가 사용하는 통신 객체

    @abstractmethod
    def turn_on(self):
        pass # 자식 클래스에서 기기별로 다르게 구현해야 함

    @abstractmethod
    def turn_off(self):
        pass

    @abstractmethod
    def get_status(self):
        pass

# [3. 구체적인 기기 구현]: 추상 클래스를 상속받아 실제 동작 정의
class SmartLight(Device):
    def turn_on(self):
        # f-string을 사용해 객체 내부의 속성값을 출력에 활용
        print(f'{self.brand} {self.name}을 켭니다.')

    def turn_off(self):
        print(f'{self.brand} {self.name}을 끕니다.')

    def get_status(self):
        print('현재 전등의 밝기는 100%입니다.')

class AirConditioner(Device):
    def turn_on(self):
        print(f'{self.brand} {self.name} 에어컨을 가동합니다.')

    def turn_off(self):
        print(f'{self.brand} {self.name} 에어컨을 정지합니다.')

    def get_status(self):
        print('현재 설정 온도는 24도 입니다.')

# [4. 통신 방식 추상 클래스]: 연결 방식의 규격
class Protocol(ABC):
    @abstractmethod
    def start_connection(self):
        pass # WiFi나 Zigbee 등에서 각자 방식대로 구현

# [5. 구체적인 통신 방식 구현]
class WiFiProtocol(Protocol):
    def start_connection(self):
        print('WiFi로 연결을 시도합니다.')

class ZigbeeProtocol(Protocol):
    def start_connection(self):
        print('Zigbee망을 구성합니다.')

##############호환성 검사##############
# 1. 사용할 통신 방식(프로토콜) 객체 생성
wifi = WiFiProtocol()
zigbee = ZigbeeProtocol()

# 2. 샤오미 허브 생성 (Zigbee 방식만 지원하도록 설정)
xiaomi_hub = Smarthub("샤오미 허브", zigbee)

# 3. 기기 생성 (필립스는 WiFi, 이케아는 Zigbee)
philips_light = SmartLight("필립스 전등", "Philips", wifi)
ikea_light = SmartLight("이케아 전등", "IKEA", zigbee)

# 4. 등록 테스트
print("--- [기기 등록 테스트] ---")
xiaomi_hub.register_device(philips_light) # 호환 실패 메시지 출력 예상
xiaomi_hub.register_device(ikea_light)    # 등록 성공 예상

# 5. 가동 테스트
print("\n--- [전체 가동 테스트] ---")
xiaomi_hub.activate_all() # Zigbee 연결 메시지 후 이케아 전등 켜짐 예상