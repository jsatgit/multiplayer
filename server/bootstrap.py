from app import flask_app
from flask_socketio import SocketIO 
from game import init_game 

flask_app.config.from_object('config')
socketio = SocketIO(flask_app)

init_game()

import events.user 
import events.person
import events.house
import events.resource
