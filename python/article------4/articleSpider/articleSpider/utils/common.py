import hashlib

def getMd5(url):
    #判断url是什么编码
    if isinstance(url,str):  #如果为string类型,那么就是unicode编码 | python3中默认unicode编码
        url=url.encode("utf-8")  #hashlib只支持utf8编码，所以要编码
    m=hashlib.md5()
    m.update(url)
    return m.hexdigest()
     




# print(getMd5("赫尔呃呃呃呃呃呃鹅鹅鹅鹅鹅鹅饿"))