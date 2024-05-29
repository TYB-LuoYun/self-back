import scrapy
from scrapy_selenium import SeleniumRequest
from scrapyproject.items import Token
import re
import datetime
class MyspiderSpider(scrapy.Spider):
    name = "myspider"
    allowed_domains = ["etherscan.io"]
    rootUrl = "https://etherscan.io"
    pageUrl = "https://www.adidas.com/us/search?sort=newest-to-oldest"
    page = 1
    start_urls = [pageUrl + str(page)]
    pages = None;

    def parse(self, response): 
        current_time = datetime.datetime.now()
        print("解析------------------------------------")
        tokenList = response.selector.xpath( 
                '//*[@id="ContentPlaceHolder1_tblErc20Tokens"]/table/tbody/tr') 
        if(self.pages is  None):
            text = response.selector.xpath("//*[@id='ContentPlaceHolder1_divPagination']/nav/ul/li[3]/span/text()").extract_first("") 
            self.pages = re.search(r'\d+$', text).group() 
            self.pages = int(self.pages) 
            print("最大页数",self.pages )    
        else:
            if(self.page>self.pages):
                print("任务结束",self.pages)
                return
        print("列表数",len(tokenList) )        
        for tr in tokenList:
            # print(tr)
            token=Token()
            token["chain"] = "Eth" 
            token["updateTime"] = current_time.strftime("%Y-%m-%d %H:%M:%S")
            token["name"] = tr.css("td:nth-child(2)  a   div   div::text").extract_first("")
            token["simpleName"] = tr.css(" td:nth-child(2)   a   div   span::text").extract_first("").strip('()')
            token["link"] = tr.css("td:nth-child(2)  a::attr(href)").extract_first("")
            token["address"] = re.search(r'/token/(\w+)', token["link"]).group(1)
            token["link"]  = self.rootUrl + token["link"] 
            token["price"]  = tr.css("td:nth-child(3)  div.d-inline::text").extract_first("").strip()
            token["price"] = float(re.sub(r'[^\d.-]', '', token["price"]))
            token["change"] = tr.css("td:nth-child(4)   span::text").extract_first("")  
            token["volumn24"] = tr.css("td:nth-child(5)::text").extract_first("").strip()
            token["volumn24"] = float(re.sub(r'[^\d.-]', '', token["volumn24"]))
            token["circulatingMarketCap"] = tr.css(" td:nth-child(6)::text").extract_first("").strip()
            token["circulatingMarketCap"] = float(re.sub(r'[^\d.-]', '', token["circulatingMarketCap"]))
            token["totalMarketCap"] = tr.css(" td:nth-child(7)::text").extract_first("").strip()
            token["totalMarketCap"] = float(re.sub(r'[^\d.-]', '', token["totalMarketCap"]))
            token["holders"] = tr.css("td:nth-child(8)  div:nth-child(1)::text").extract_first("")
            token["holders"] = float(re.sub(r'[^\d.-]', '', token["holders"]))
            yield token
            
        self.page = self.page +1     
        print("请求下一页",self.page)
        
        # yield scrapy.Request(url='https://etherscan.io/txs', callback=self.parse)
        yield SeleniumRequest(url=self.pageUrl + str(self.page), callback=self.parse)
        pass
