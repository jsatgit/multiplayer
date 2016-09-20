from flask import Flask, render_template
from flask_socketio import SocketIO, send, emit
from time import sleep
from threading import Thread

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

def send(lat, lng):
    print 'sending'
    emit('marker', {'lat': lat, 'lng': lng}, broadcast=True, include_self=False)
    sleep(5)

class Game:
    def __init__(self):
        self.ready = False

    def start(self):
        send(3, 10)
        send(43, 20)
        send(-33, -110)

    def ready(self):
        self.ready = True

game = Game()

def sendToEveryone(event, data):
    emit(event, data, broadcast=True, include_self=False)

@socketio.on('addMarker')
def on_addMarker(event):
    print event['type']
    print event['latlong']
    sendToEveryone('markerReceived', event);

@socketio.on('setPosition')
def on_setPosition(event):
    print event['person']
    print event['loc']
    sendToEveryone('positionSetReceived', event);

if __name__ == '__main__':
    socketio.run(app)
