# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class OkzywprojectItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    pass



class Films(scrapy.Item):
     id=scrapy.Field()
     namez=scrapy.Field()
     url=scrapy.Field()
     types=scrapy.Field()
     timez=scrapy.Field()
     def get_insert_sql(self):
         sql = """
            INSERT INTO film(id,namez,url,types,timez) VALUES(%s,%s,%s,%s,%s)
         """
         params = (self['id'],self['namez'],self['url'],self['types'],self['timez'])
         return sql, params





        


class FilmsDetail(scrapy.Item):
    id=scrapy.Field()
    # 外键
    fid=scrapy.Field()
    namez=scrapy.Field()
    director=scrapy.Field()
    star=scrapy.Field()
    types=scrapy.Field()
    areaz=scrapy.Field()
    languagez=scrapy.Field()
    releasez=scrapy.Field()
    duration=scrapy.Field()
    timez=scrapy.Field()
    views=scrapy.Field()
    likes=scrapy.Field()
    detail=scrapy.Field()
    playSource=scrapy.Field()
    downloadSource=scrapy.Field()
    

    def get_insert_sql(self):
         sql = """
            INSERT INTO filmDetail(id,fid,namez,director,star,types,areaz,languagez,releasez,duration,timez,views,likes,detail,playSource,downloadSource) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
         """

         params = (self['id'],self['fid'],self['namez'],self['director'],self['star'],self['types'],self['areaz'],self['languagez'],self['releasez'],self['duration'],self['timez'],self['views'],self['likes'],self['detail'],self['playSource'],self['downloadSource'])
         return sql, params