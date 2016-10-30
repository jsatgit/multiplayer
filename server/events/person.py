from app import socketio
from flask import request
from game import get_person
from emitter import send_to_everyone

UPDATE_POSITON = 'update_position'
MOVE = 'move'

@socketio.on(MOVE)
def on_move(direction):
    person = get_person(request.sid)
    person.move(direction)
    send_to_everyone(UPDATE_POSITON, {
        'id': person.id,
        'position': person.position
    })
