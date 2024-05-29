# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter 
from kafka import KafkaConsumer, KafkaProducer
import json 

class ScrapyprojectPipeline:
    def process_item(self, item, spider): 
        return item

class MyPipeline(object): 
    def __init__(self) :
        # self.producer = KafkaProducer(bootstrap_servers=['192.168.10.11:9092']) 
        pass
    def process_item(self, item, spider):
        print("处理") 
        # print(json.dump(item))
        print(json.dumps(item.__dict__["_values"] ))
        # print(jsonpickle.encode(item))
        self.producer.send('token',json.dumps(item.__dict__["_values"] ).encode()) 
        return item