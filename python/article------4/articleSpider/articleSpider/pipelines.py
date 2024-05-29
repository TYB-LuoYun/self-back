# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html

# import scrapy
from scrapy.pipelines.images import ImagesPipeline

from scrapy.exporters import JsonItemExporter
import codecs
import json

from twisted.enterprise import adbapi 

import MySQLdb
import MySQLdb.cursors

class ArticlespiderPipeline(object):
    def process_item(self, item, spider):
        # print("==================================================================papeline模块处理")
        return item


#持久化实体类(另一种实现)调用scrapy提供的json export导出json文件
# class PersistPipeline1(object):
#     def __init__(self):
#         self.file=open('article1.json','wb')#wb以二进制写
#         self.exporter=JsonItemExporter(self.file,encoding="utf-8",ensure_ascii=False)#实例化JsonItemExporter对象
#         self.exporter.start_exporting() 

#     def process_item(self, item, spider):
#         # print("==================================================================PersistPipeline处理")
#         self.exporter.export_item(item)
#         return item   
    
#     def close_spider(self,spider):
#         self.exporter.finish_exporting() #停止导出
#         self.file.close() #关闭流

#持久化实体类
class PersistPipeline(object):
    def __init__(self):
        self.file=codecs.open('article.json','w',encoding='utf-8')

    def process_item(self, item, spider):
        # print("==================================================================PersistPipeline处理")
        lines=json.dumps(dict(item),ensure_ascii=False)+"\n"
        self.file.write(lines)
        return item   
    
    def spider_closed(self,spider):
        self.file.close()


#持久化实体类到mysql
# class MysqlPipeline(object):
#     def __init__(self):
#         # 连接数据库
#         self.conn=MySQLdb.connect("120.55.95.79","root","root","crawl",charset="utf8",use_unicode=True)
#         self.cursor=self.conn.cursor()

#     def process_item(self, item, spider):
#         # print("==================================================================mysqlPipeline处理")
#         sql="insert into item(id,url,imageurl,imagepath) values (%s,%s,%s,%s)"
#         self.cursor.execute(sql,(item["id"],item["url"],item["imageurl"][0],item["imagepath"]))
#         self.conn.commit()
#         return item 

#异步持久化实体类到mysql
class MysqlTwistedPipeline(object):
    def __init__(self,dbpool):
        self.dbpool=dbpool

    #读取配置信息
    @classmethod
    def from_settings(cls,settings):
        dbParams = dict(
            host=settings["MYSQL_HOST"],
            user=settings["MYSQL_USER"],
            passwd=settings["MYSQL_PASSWORD"],  #所有的参数名都固定
            db=settings["MYSQL_DBNAME"],   
            charset='utf8',
            cursorclass=MySQLdb.cursors.DictCursor,
            use_unicode=True
        )

        dbpool = adbapi.ConnectionPool("MySQLdb",**dbParams)
        return cls(dbpool)

    def process_item(self, item, spider):
        #使用twisted将mysql插入变成异步执行
        query = self.dbpool.runInteraction(self.do_insert,item)
        #出错后执行函数
        query.addErrback(self.handleError)
        # return item 
    
    def do_insert(self,cursor,item):
        #三个引号意味着你可以换行
         sql="""
              insert into item(id,url,imageurl,imagepath) values (%s,%s,%s,%s)
             """
         cursor.execute(sql,(item["id"],item["url"],item["imageurl"][0],item["imagepath"]))
    
    def handleError(self,failure):
        #处理异步插入的异常
        print(failure)


class ArticleImagePipeline(ImagesPipeline):
    def item_completed(self,results,item,info):
        for ok,value in results:
            #获取文件存储路径
            imageFilePath = value["path"]
            #获取文件存储的路径后，保存在实体对象的imagepath中
        item["imagepath"]=imageFilePath
        print("==================================================================imagepapeline模块处理")
        print("图片存储路径："+item["imagepath"])
        print("id："+item["id"])
        print("源图片下载地址："+item["imageurl"][0])
        return item