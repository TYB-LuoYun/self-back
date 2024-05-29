# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html

# import MySQLdb
from twisted.enterprise import adbapi
# import MySQLdb.cursors

class OkzywprojectPipeline(object):
    def process_item(self, item, spider):

        return item

class MysqlPipeline(object):
    def __init__(self,dbpool):
        #连接数据库
        # self.conn=MySQLdb.connect('120.55.95.79','root','2011199033@mysql','crawl',charset="utf8",use_unicode=True)
        # self.cursor=self.conn.cursor()
        self.dbpool=dbpool
    
    #读取配置信息
    @classmethod
    def from_settings(cls,settings):
        dbParams=dict(
            host=settings["MYSQL_HOST"],
            db=settings["MYSQL_DBNAME"],
            user=settings["MYSQL_USER"],
            passwd=settings["MYSQL_PASSWORD"],
            charset="utf8",
            # cursorclass=MySQLdb.cursors.DictCursor,
            use_unicode=True
        )
        # dbpool=adbapi.ConnectionPool("MySQLdb",**dbParams)
        # return cls(dbpool)
        return dbParams;

    def process_item(self, item, spider):
        print("正在持久化==================================================")
        # sql, params = item.get_insert_sql()
        # print (sql, params)
        # self.cursor.execute(sql, params)
        # self.conn.commit()
        #使用twist将mysql插入变成异步执行
        # query=self.dbpool.runInteraction(self.do_insert,item)
        #出错后执行函数
        # query.addErrback(self.handle_error, item, spider) #处理异常
        # return item

    def do_insert(self, cursor, item):
        # sql, params=item.get_insert_sql()
        print(sql, params)
        # cursor.execute(sql,params)
    
    def handle_error(self, failure, item, spider):
        print("出错了=====================================================")
        print(failure)