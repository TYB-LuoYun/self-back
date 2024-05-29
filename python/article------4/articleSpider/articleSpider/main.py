# -*- coding:utf-8 -*-
# @Time : 2020/4/3 15:11
# @Author : Gva
# @Web : anets.cn

import os
import sys
from scrapy import cmdline
from urllib import parse

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

print(os.path.dirname(os.path.abspath(__file__)))
cmdline.execute('scrapy crawl login'.split(' '))
# print(parse.urljoin("http://anets.cn/share","list"))


def myadd(x, y): return x + y


print(myadd(1, 2))
