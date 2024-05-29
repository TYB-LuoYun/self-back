# -*- coding: utf-8 -*-
import scrapy

#导入selenium相关包
# from selenium import webdriver
# from scrapy.selector import Selector
from  okzywProject.utils.common import getMd5

from okzywProject.items import Films
from okzywProject.items import FilmsDetail

import json
class CrawlokzywSpider(scrapy.Spider):
    name = 'crawlOkzyw'
    allowed_domains = ['www.okzyw.com']
    
    start_urls = ['http://www.okzyw.com/?m=vod-type-id-1.html']

    def parse(self, response):
        # datas=response.text.encode("utf-8").decode('utf-8', 'ignore').replace(u'\xa9', u'')
        # datas=response.css(".xing_vb").extract()[0].encode("utf-8").decode('utf-8', 'ignore').replace(u'\xa0', u'')
        #爬取数据
        baseUrl="http://www.okzyw.com"
        uls=response.css(".xing_vb ul")
        for ul in uls:
            #爬取到 电影名  详情url 类型 时间
            films=Films()
            name=ul.css(".xing_vb4 a::text").extract_first("")
            films["namez"]=name
            url=baseUrl+ul.css(".xing_vb4 a::attr(href)").extract_first("")
            films["url"]=url
            films["types"]=ul.css(".xing_vb5::text").extract_first("")
            films["timez"]=ul.css(".xing_vb6::text").extract_first("")
            id=getMd5(url)
            films["id"]=id
         
            # print(name+"|"+url+"|"+types+"|"+timez)
            # 将实体对象交给pipeline
            
            # print(name)
            print("============================================")
            print("爬取详情页："+url)
            if name!='' and url!='':
                yield films
                yield scrapy.Request(url=url,meta={'id':id},callback=self.parseDetail)
                # pass
            else:
                print("url为空，跳过")
        # print("抓取文本:"+datas)
        # 爬取下一页
        next=response.css(".pages .pagenow + a::attr(href)").extract_first("")
        page=response.css(".pages .pagenow + a::text").extract_first("")
        if next=='':
            print("结束了")
            pass
        else:
            print("当前页|||||||||||||||||||||||||||||||||||||||||||||||||||")
            print(page)
            nextPage=baseUrl+next
            yield scrapy.Request(url=nextPage)
        pass





    def parseDetail(self,response):
        # 爬取： 电影名name  导演 director 主演star  类型types 地区area 语言language  上映release 片长duration  更新时间timez 播放量views  喜欢likes 
        #  剧情介绍 detail   播放源  playSource   下载源 downloadSource 
        print("正在爬取:"+response.url)
        filmDetail=FilmsDetail()
        filmDetail["id"]=getMd5(response.url+"detail")
       
        filmDetail["fid"]=response.meta.get("id","")  #外键
        filmDetail["namez"]=response.css(".warp .ibox .vodh h2::text").extract_first("")

        filmDetail["director"]=response.css(".warp .ibox .vodinfobox ul li")[1].css("span::text").extract_first("")
        filmDetail["star"]=response.css(".warp .ibox .vodinfobox ul li")[2].css("span::text").extract_first("")
        filmDetail["types"]=response.css(".warp .ibox .vodinfobox ul li")[3].css("span::text").extract_first("")
        filmDetail["areaz"]=response.css(".warp .ibox .vodinfobox ul li")[4].css("span::text").extract_first("")
        filmDetail["languagez"]=response.css(".warp .ibox .vodinfobox ul li")[5].css("span::text").extract_first("")
        filmDetail["releasez"]=response.css(".warp .ibox .vodinfobox ul li")[6].css("span::text").extract_first("")
        filmDetail["duration"]=response.css(".warp .ibox .vodinfobox ul li")[7].css("span::text").extract_first("")
        filmDetail["timez"]=response.css(".warp .ibox .vodinfobox ul li")[8].css("span::text").extract_first("")
        filmDetail["views"]=0
        filmDetail["likes"]=0
        filmDetail["detail"]=response.css(".warp .playBox .vodplayinfo::text").extract_first("")

        playSource1Name=response.css(".warp .playBox .vodplayinfo  #1 h3 span::text").extract_first("")
        playSource1Url=response.css(".warp .playBox .vodplayinfo #1 ul li input::attr(value)").extract_first("")

        playSource2Name=response.css(".warp .playBox .vodplayinfo  #2 h3 span::text").extract_first("")
        playSource2Url=response.css(".warp .playBox .vodplayinfo #2 ul li input::attr(value)").extract_first("")
        # playSource: {"":"","":""}
        psn=[{"playSourceName":playSource1Name,"playSourceUrl":playSource1Url},{"playSourceName":playSource2Name,"playSourceUrl":playSource2Url}]
        filmDetail["playSource"]=json.dumps(psn, ensure_ascii=False) 
        # filmDetail["playSource"]=psn
        downloadSource1Name=response.css(".warp .playBox .vodplayinfo  #down_1 h3 span::text").extract_first("")
        downloadSource1Url=response.css(".warp .playBox .vodplayinfo #down_1 ul li input::attr(value)").extract_first("")

        downloadSource2Name=response.css(".warp .playBox .vodplayinfo  #down_2 h3 span::text").extract_first("")
        downloadSource2Url=response.css(".warp .playBox .vodplayinfo #down_2 ul li input::attr(value)").extract_first("")
        
        dsn=[{"downloadSourceName":downloadSource1Name,"downloadSourceUrl":downloadSource1Url},{"downloadSourceName":downloadSource2Name,"downloadSourceUrl":downloadSource2Url}]
        filmDetail["downloadSource"]=json.dumps(dsn, ensure_ascii=False) 
        
        yield filmDetail
        print("详情页解析完成")
       

