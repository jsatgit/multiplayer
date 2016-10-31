from app import socketio
from flask import request
from game import get_person
from emitter import send_to_everyone

UPDATE_POSITON = 'update_position'
MOVE = 'move'

@socketio.on(MOVE)
def on_move(options):
    person = get_person(request.sid)
    if options.get('direction'):
        person.move_direction(options.get('direction'))
    elif options.get('step'):
        person.move_step(options.get('step'))
    send_to_everyone(UPDATE_POSITON, {
        'id': person.id,
        'position': person.position
    })
