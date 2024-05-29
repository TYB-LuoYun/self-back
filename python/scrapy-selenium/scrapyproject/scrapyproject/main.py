# -*- coding:utf-8 -*-
# @Time : 2020/4/3 15:11
# @Author : Gva
# @Web : anets.cn
import json
# from utils.common import getMd5
from scrapy import cmdline
import sys
import os

# import win_unicode_console
# win_unicode_console.enable()
from kafka import KafkaProducer
from  items import Token 
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
print(os.path.dirname(os.path.abspath(__file__)))
cmdline.execute('scrapy crawl myspider'.split(' '))



# item=Token()
# item["chain"] = "Eth" 
# str = json.dumps(item.__dict__["_values"] )
# print(str)
# producer = KafkaProducer(bootstrap_servers=['192.168.10.11:9092'],
#             value_serializer=lambda m: json.dumps(m).encode('ascii')) 
# producer.send('token',str) 
# dsn=[1,2,34]
# json.dumps(dsn,ensure_ascii=False)


# print(getMd5(''))
 