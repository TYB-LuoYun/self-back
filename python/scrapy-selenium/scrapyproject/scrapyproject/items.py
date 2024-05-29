# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy 

class ScrapyprojectItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    pass 
class Token(scrapy.Item):
     name=scrapy.Field()
     simpleName = scrapy.Field()
     link = scrapy.Field()
     address = scrapy.Field()
     chain = scrapy.Field()
     price=scrapy.Field()
     change=scrapy.Field()
     volumn24=scrapy.Field()
     circulatingMarketCap=scrapy.Field()
     totalMarketCap=scrapy.Field()
     holders=scrapy.Field()
     updateTime = scrapy.Field()
   
   
        

    #  def get_insert_sql(self):
    #      sql = """
    #         INSERT INTO film(id,namez,url,types,timez) VALUES(%s,%s,%s,%s,%s)
    #      """
    #      params = (self['id'],self['namez'],self['url'],self['types'],self['timez'])
    #      return sql, params

