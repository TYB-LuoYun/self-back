# -*- coding: utf-8 -*-
import scrapy


class LoginSpider(scrapy.Spider):
    name = 'login'
    allowed_domains = ['localhost:8090']
    start_urls = ['http://localhost:8090/']

    def parse(self, response):
        print("解析中")
        pass

   


    def start_requests(self):
        #实现表单提交
        formdata={
            "usermail":"admin@qq.com",
            "password":"2011199033"
        }
        print("登陆中...")
        return [scrapy.FormRequest(url="http://localhost:8090/user/login",callback=self.afterLogin)]
        # return [scrapy.FormRequest(url="http://localhost:8090/api/user/login.action",formdata=formdata,callback=self.afterLogin)]
   

    def afterLogin(self,response):
         print("登陆之后...")
         print(response.text)
        # pass