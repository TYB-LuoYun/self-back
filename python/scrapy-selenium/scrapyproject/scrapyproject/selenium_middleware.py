from scrapy import signals
from scrapy.http import HtmlResponse
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service 
import logging
from selenium.webdriver.remote.remote_connection import LOGGER
class SeleniumMiddleware:
    @classmethod
    def from_crawler(cls, crawler):
        middleware = cls()
        crawler.signals.connect(middleware.spider_opened, signal=signals.spider_opened)
        crawler.signals.connect(middleware.spider_closed, signal=signals.spider_closed)
        return middleware

    def spider_opened(self, spider): 
        # 禁止将日志消息输出到控制台
        LOGGER.setLevel(logging.WARNING)
        options = Options()
        options.add_argument('--headless')  # 启用无头模式
        # service = Service(ChromeDriverManager().install())  ##自动地去下载浏览器
        service = Service('D:/work/project/self/crawl-msg/blockMsg/chromedriver.exe')
        self.driver = webdriver.Chrome(service=service)

    def spider_closed(self, spider):
        self.driver.quit()

    def process_request(self, request, spider):
        self.driver.get(request.url)
        body = self.driver.page_source.encode('utf-8')
        return HtmlResponse(self.driver.current_url, body=body, encoding='utf-8', request=request) 