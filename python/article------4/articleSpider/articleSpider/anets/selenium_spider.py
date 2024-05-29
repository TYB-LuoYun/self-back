from selenium import webdriver
from scrapy.selector import Selector

browser = webdriver.Chrome(executable_path="D:/anetsPython/article/chromedriver.exe")
browser.get("http://anets.cn/user/login.jsp")

#获取用户登录的输入框,并输入值,模拟点击操作
browser.find_element_by_css_selector("input[name='usermail']").send_keys("admin@qq.com")
browser.find_element_by_css_selector("input[name='password']").send_keys("2011199033tyb")
browser.find_element_by_id("submit").click()


#退出浏览器
# browser.quit()
