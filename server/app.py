from flask import Flask
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

def sendToEveryone(event, data):
    print 'emiting event: {event} and data: {data}'.format(
        event=event,
        data=data
    )
    emit(event, data, broadcast=True, include_self=False)

@socketio.on('addPerson')
def on_add_person(data):
    sendToEveryone('addPerson', data);

@socketio.on('addHouse')
def on_add_house(data):
    sendToEveryone('addHouse', data);

@socketio.on('setPosition')
def on_set_position(data):
    sendToEveryone('setPosition', data);

if __name__ == '__main__':
    socketio.run(app)
