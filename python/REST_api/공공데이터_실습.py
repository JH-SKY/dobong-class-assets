import requests
from pprint import pprint
import os
from dotenv import load_dotenv
load_dotenv()
import asyncio
import aiohttp

URL = 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty'
AIR_KOREA_API_KEY = os.getenv('AIR_KOREA_API_KEY')

### 서울 데이터 가져오기
params = {
    'serviceKey': AIR_KOREA_API_KEY,
    'sidoName': '서울',
    'returnType': 'json',
      'ver': 1.0,
      'numOfRows' : 100
      }
headers = {}
response = requests.get(URL, headers=headers, params=params)
response.raise_for_status()
data = response.json()

### 데이터 가공하기

station_list = data['response']['body']['items']

# .isdigit()은 이 문자열이 숫자로만 이루어져 있는지 확인해줍니다.

valid_station_list = [
    item for item in station_list
    if item.get('pm25Value') and item['pm25Value'].isdigit()
]
sorted_station_list = sorted(valid_station_list, key=lambda el: int(el['pm25Value']))
best_air_station = sorted_station_list[0]['stationName']

#pprint(best_air_station)

### 서울데이터 자료 재구성

station_mapping = { item['stationName']: item for item in station_list }

target_station = '한강대로'

gn_data = station_mapping.get(target_station)

# 1. gn_data가 None이 아닐 때만(데이터가 있을 때만) 실행해!

if gn_data:
    print(f"[{target_station}]의 초미세먼지 농도: {gn_data['pm25Value']}")

else:
    # 2. 데이터가 없을 때를 대비한 친절한 안내
    print(f" {target_station} 측정소의 유효한 데이터가 현재 없습니다.")

# pprint(station_mapping)

### 제주 데이터

params = {'serviceKey': AIR_KOREA_API_KEY,'sidoName': '제주','returnType': 'json', 'ver': '1.0'}
response = requests.get(URL, headers=headers, params=params)
response.raise_for_status()
data = response.json()
station_list = data['response']['body']['items']
sorted_station_list = sorted(station_list, key=lambda el: int(el['pm25Value']))
best_air_station = sorted_station_list[0]['stationName']

#pprint (best_air_station)

### 종로구 1달치 데이터 가져오기
URL = 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty'
AIR_KOREA_API_KEY = os.getenv('AIR_KOREA_API_KEY')
params = {
    'serviceKey': AIR_KOREA_API_KEY,
    'returnType': 'json',
    'dataTerm' : 'MONTH',
    'numOfRows' : 1000 ,
    'stationName' : '종로구'
}

response = requests.get(URL, params=params)
response.raise_for_status()
data = response.json()
dobong_monthly_data = data['response']['body']['items']

pprint( len(dobong_monthly_data))
# pprint( dobong_monthly_data[0])
# pprint( dobong_monthly_data[-1])
######################################################## 제미나이 수정코드 (불필요한 부분 삭제)

# # 환경 변수 로드
# load_dotenv()
# AIR_KOREA_API_KEY = os.getenv('AIR_KOREA_API_KEY')
# URL_REALTIME = 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty'
# URL_STATION_HISTORY = 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty'

# def get_valid_data(items):
#     """지저분한 데이터('-')를 걸러내고 숫자만 남기는 거름망 함수"""
#     return [item for item in items if item.get('pm25Value') and item['pm25Value'].isdigit()]

# # --- 1. 서울 실시간 데이터 ---
# params_seoul = {
#     'serviceKey': AIR_KOREA_API_KEY,
#     'sidoName': '서울',
#     'returnType': 'json',
#     'ver': '1.0',
#     'numOfRows': 100
# }
# resp_seoul = requests.get(URL_REALTIME, params=params_seoul)
# resp_seoul.raise_for_status()
# seoul_items = resp_seoul.json()['response']['body']['items']

# # 데이터 가공 및 정렬
# valid_seoul = get_valid_data(seoul_items)
# sorted_seoul = sorted(valid_seoul, key=lambda x: int(x['pm25Value']))
# print(f"서울 최적 측정소: {sorted_seoul[0]['stationName']} ({sorted_seoul[0]['pm25Value']}µg/m³)")

# # 자료구조 재구성 (Mapping)
# seoul_mapping = { item['stationName']: item for item in seoul_items }

# # --- 2. 제주 실시간 데이터 (안전장치 추가) ---
# params_jeju = {**params_seoul, 'sidoName': '제주'}
# resp_jeju = requests.get(URL_REALTIME, params=params_jeju)
# resp_jeju.raise_for_status()
# jeju_items = resp_jeju.json()['response']['body']['items']

# valid_jeju = get_valid_data(jeju_items)
# if valid_jeju:
#     sorted_jeju = sorted(valid_jeju, key=lambda x: int(x['pm25Value']))
#     print(f"제주 최적 측정소: {sorted_jeju[0]['stationName']} ({sorted_jeju[0]['pm25Value']}µg/m³)")

# # --- 3. 종로구 한 달 치 데이터 ---
# params_jongno = {
#     'serviceKey': AIR_KOREA_API_KEY,
#     'returnType': 'json',
#     'dataTerm': 'MONTH',
#     'numOfRows': 1000,
#     'stationName': '종로구',
#     'ver': '1.0'
# }
# resp_jongno = requests.get(URL_STATION_HISTORY, params=params_jongno)
# resp_jongno.raise_for_status()
# jongno_monthly_data = resp_jongno.json()['response']['body']['items']

# print(f"\n종로구 데이터 총 {len(jongno_monthly_data)}건 로드 완료")
# print(f"최근 데이터: {jongno_monthly_data[0]['dataTime']} - 농도: {jongno_monthly_data[0]['pm25Value']}")