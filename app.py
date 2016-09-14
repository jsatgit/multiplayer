from flask import Flask, render_template
from flask_socketio import SocketIO
from flask_socketio import send, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

class Counter:
    def __init__(self):
        self.count = 0

    def update(self):
        self.count += 1

counter = Counter()

@socketio.on('update')
def on_update():
    counter.update() 
    emit('count', counter.count, broadcast=True)

if __name__ == '__main__':
    socketio.run(app)
