from SimpleWebSocketServer import SimpleWebSocketServer, WebSocket

clients = []

class Counter:
    count = 0

    @classmethod
    def update(self):
       self.count += 1 

class CounterServer(WebSocket):
    def handleMessage(self):
        Counter.update()
        for client in clients:
            client.sendMessage(str(Counter.count))

    def handleConnected(self):
        print self.address
        clients.append(self)

    def handleClose(self):
        clients.remove(self)

server = SimpleWebSocketServer('25.13.225.77', 8000, CounterServer)
server.serveforever()
