from flask import Flask
from flask_socketio import SocketIO 

flask_app = Flask(__name__)
flask_app.config.from_object('config')
socketio = SocketIO(flask_app)

import events.user 
import events.person
import events.house
