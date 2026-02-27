import requests
from bs4 import BeautifulSoup

URL = "https://news.google.com/topics/CAAqIQgKIhtDQkFTRGdvSUwyMHZNRFp4WkRNU0FtdHZLQUFQAQ?hl=ko&gl=KR&ceid=KR%3Ako"
response = requests.get(URL)

soup = BeautifulSoup(response.text, "html.parser")

articles = soup.select("a.gPFEn")

for article in articles:
    title = article.get_text()  # 태그 안의 텍스트
    link = article["href"]  # href 속성값
    print(f"제목: {title}")
    print(f"링크: {link}")
    print("-" * 50)
    # excel 저장 / json 저장 / db 저장....
