from playwright.sync_api import sync_playwright
import time

pw = sync_playwright().start()
browser = pw.chromium.launch(headless=False)
page = browser.new_page()

page.goto("https://comic.naver.com/webtoon?tab=mon")
page.wait_for_load_state("networkidle")

titles = page.locator(".ContentTitle__title--e3qXt").all()

for title in titles:
    print(title.text_content())

browser.close()
pw.stop()
time.sleep(10)
