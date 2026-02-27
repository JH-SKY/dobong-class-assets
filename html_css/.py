from playwright.sync_api import sync_playwright

# 1. Playwright 시작 및 브라우저 실행
pw = sync_playwright().start()
browser = pw.chromium.launch(headless=False)
page = browser.new_page()

# 2. 네이버 웹툰 페이지 이동
page.goto("https://comic.naver.com/webtoon?tab=mon")
page.wait_for_load_state("networkidle")

# 3. 웹툰 목록 추출 (선택자는 개발자 도구에서 확인)
items = page.locator(".ContentTitle__title--e3qXt").all()

print(f"웹툰 목록 ({len(items)}건)")
print("=" * 40)

for i, item in enumerate(items, 1):
    print(f"{i}. {item.text_content()}")

# 4. 브라우저 종료
browser.close()
pw.stop()