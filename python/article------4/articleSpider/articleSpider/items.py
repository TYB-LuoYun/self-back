# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class ArticlespiderItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    pass

class ArticleItem(scrapy.Item):
    #声明提取的字段
    url=scrapy.Field()
    #这个字段之后处理要，通过对response.url进行md5加密作为唯一的标识，去重策略
    id=scrapy.Field()
    #这个字段我赋默认值了，测试看pipeline能否自动下载图片
    imageurl=scrapy.Field()
    imagepath=scrapy.Field()
