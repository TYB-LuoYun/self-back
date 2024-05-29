# -*- coding: utf-8 -*-
import scrapy

from scrapy.http import Request

from articleSpider.items import ArticleItem

from articleSpider.utils.common import getMd5

from scrapy.loader import ItemLoader


class OkzywSpider(scrapy.Spider):
    name = 'okzyw'
    allowed_domains = ['www.okzyw.com']
    start_urls = ['http://www.okzyw.com/?m=vod-type-id-1-pg-1.html']

    def parse(self, response):
        print("新一页的parse======================"+response.url)

        #提取电影详情列表的url,并对每个url的详情列表进行解析
        urls=response.css(".xing_vb ul li a::attr(href)").extract()
        
       

      
        for url in urls:
             
            url='http://www.okzyw.com'+url
            print(url)

            
            #实例化，pojo对象
            pojo = ArticleItem()
            #封装pojo
            pojo["id"]=getMd5(url)
            pojo["url"]=url
            pojo["imageurl"]=["https://t9.baidu.com/it/u=2268908537,2815455140&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1586583465&t=a8bdfbf9d3a72fa1e9771c344f1f91e1"]
            
            
            
            
            
            
            
            
            #将pojo对象交给pipelines处理
            yield pojo


            # yield Request(url=url,callback=self.parseDetail)
            

            
            

        

        #提取下一页的url,存在的话就交给scrapy下载
        # nextPageUrl=response.css('.pagenow  + a::attr(href)').extract_first()
        # if(nextPageUrl):
        #     nextPageUrl='http://www.okzyw.com'+nextPageUrl
        #     print("下一页地址："+nextPageUrl)
        #     yield  Request(url=nextPageUrl,callback=self.parse)

    def parseDetail(self,response):
        print("解析每个电影详情"+response.url)
        pass
