import tkinter as tk
from tkinter import ttk
import webbrowser
import subprocess
import sys
from PyQt5.QtNetwork import QLocalServer, QLocalSocket
from PyQt5.QtWidgets import QApplication, QMessageBox
from PyQt5.QtCore import Qt, QObject, pyqtSignal, pyqtSlot
from PyQt5.QtCore import pyqtSignal, QObject, QProcess, QDataStream, QIODevice
from PyQt5.QtNetwork import QTcpServer, QHostAddress
import socket
import threading
class WebBrowserApp(QObject):
  

    @staticmethod
    def handle_client(client_socket):
        data = client_socket.recv(1024)
        msg = data.decode()
        print(f"Received message from B: {msg}")  
        # WebBrowserApp.finished_signal.emit(msg)  # 发送包含消息的信号
        client_socket.close()

    @pyqtSlot(str)  # 用于处理信号的槽
    def handle_message_slot(self, message):
        print(message)
        QMessageBox.information(None, "消息", message)

    def __init__(self, root):
        super().__init__()
        self.root = root
        self.root.title("Web Browser")

        # 创建一个Entry用于输入网址
        self.url_entry = ttk.Entry(root, width=50)
        self.url_entry.grid(row=0, column=0, columnspan=2, padx=10, pady=10, sticky="ew")

        # 创建一个按钮用于打开网页
        open_button = ttk.Button(root, text="Open", command=self.open_webpage)
        open_button.grid(row=0, column=2, padx=5, pady=10)

        # 创建一个Frame用于嵌入WebBrowser
        self.web_frame = ttk.Frame(root)
        self.web_frame.grid(row=1, column=0, columnspan=3, padx=10, pady=10, sticky="nsew")

        # 设置窗口的布局
        root.columnconfigure(0, weight=1)
        root.rowconfigure(1, weight=1)
        

     

    def handle_message(self, message):
        print(message)
        QMessageBox.information(None, "Message", message)
          
    def handleConnection(self):
        print("接受")
        socket = self.local_server.nextPendingConnection()
        stream = QDataStream(socket)
        stream.setVersion(QDataStream.Qt_5_15)
        message = stream.readQString()
        print(f'A程序收到来自B程序的消息: {message}')
        socket.close()
    def open_webpage(self):
        # 获取输入的网址
        url = self.url_entry.get()

        # 使用webbrowser打开网页
        # webbrowser.open(url, new=2)
        # 指定应用程序的路径
        # app_path = r'D:\develop\IntelliJ IDEA 2018.2.2\bin\idea64.exe'
        app_path = r'D:\work\self\github\aner_webview\dist\main.exe'

        app_args = ['参数1', 'arg2', 'arg3']
        # 使用subprocess启动应用程序
        # subprocess.Popen([app_path] + app_args)
        self.run_B_program_in_thread(app_path,56); 
        # 将服务器监听移到一个单独的线程
        # server_thread = threading.Thread(target=self.listen_for_connections)
        # server_thread.start()
        print("监听消息") 

    def run_B_program_in_thread(self,appPath,parameter):
        # 创建线程并运行 run_B_program 函数
        thread = threading.Thread(target=self.run_B_program, args=(appPath,parameter))
        thread.start()    

    def run_B_program(self,appPath,parameter):
        # 启动B程序，并传递参数
        process = subprocess.Popen([appPath, str(parameter)], 
                                stdin=subprocess.PIPE, 
                                stdout=subprocess.PIPE, 
                                stderr=subprocess.PIPE,
                                text=True)

        # 等待B程序完成，并获取结果
        output, error = process.communicate()

        # 处理B程序的输出
        if process.returncode == 0:
            print(f"B程序运行成功-输出结果为: {output}") 
            # QMessageBox.information(None, "Message", output)
        else:
            print(f"B程序运行出错,错误信息为: {error}")    

    def listen_for_connections(self):
        server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        server.bind(('127.0.0.1', 12345))
        server.listen(5)
        print("监听消息中...")
        while True:
            print("等待连接...")
            client, addr = server.accept()
            print(f"从{addr[0]}:{addr[1]}接受了连接")
            client_handler = threading.Thread(target=WebBrowserApp.handle_client, args=(client,))
            client_handler.start()

if  True:
    app = QApplication(sys.argv)
    root = tk.Tk()
    WebBrowserApp(root) 
    root.mainloop() 
    sys.exit(app.exec_())