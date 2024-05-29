import socket
import threading

def handle_client(client_socket):
    data = client_socket.recv(1024)
    print(f"Received message from B: {data.decode()}")
    client_socket.close()

def main():
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind(('127.0.0.1', 12345))
    server.listen(5)
    print("A: Waiting for B to connect...")

    while True:
        client, addr = server.accept()
        print(f"A: Accepted connection from {addr[0]}:{addr[1]}")
        client_handler = threading.Thread(target=handle_client, args=(client,))
        client_handler.start()

if True:
    main()
