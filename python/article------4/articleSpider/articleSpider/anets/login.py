import requests
try:
    import cookielib  #python2
except:
    import http.cookiejar as cookielib  #python3环境

import re
#-----------------------这个是requests模拟session，cookie登录的------------------------------------




 

#自己的网站登陆
def anetsLogin(usermail,password):
    formData={
        "usermail":usermail,
        "password":password
    }
    


    headers={
        "Referer":"http://localhost:8090/user/login",
        "User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 UBrowser/6.2.4098.3 Safari/537.36"
    }

    session=requests.session()

    session.cookies=cookielib.LWPCookieJar(filename="mycookie1.txt")
    session.cookies.load(ignore_discard=True, ignore_expires=True)

    response=session.get("http://localhost:8090/user/login")
    # response=session.post("http://localhost:8090/api/user/login.action",data=formData,headers=headers)
    print(response.content)
    print(session.cookies)
    # print(response.status_code)
   
    
    with open("renren1.html","w",encoding="utf-8") as f:
       f.write(response.content.decode())



anetsLogin("admin@qq.com","2011199033")