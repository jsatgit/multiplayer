from app import socketio
from flask import request
from game import get_person
from emitter import send_to_everyone

UPDATE_POSITON = 'update_position'
MOVE_UP = 'move_up'
MOVE_DOWN = 'move_down'
MOVE_RIGHT = 'move_right'
MOVE_LEFT = 'move_left'

""" instead of separat endpoints have one with param direction """
@socketio.on(MOVE_UP)
def on_move_up():
    person = get_person(request.sid)
    person.move_up()
    send_to_everyone(UPDATE_POSITON, {
        'id': person.id,
        'position': person.position
    })

@socketio.on(MOVE_DOWN)
def on_move_down():
    person = get_person(request.sid)
    person.move_down()
    send_to_everyone(UPDATE_POSITON, {
        'id': person.id,
        'position': person.position
    })

@socketio.on(MOVE_RIGHT)
def on_move_right():
    person = get_person(request.sid)
    person.move_right()
    send_to_everyone(UPDATE_POSITON, {
        'id': person.id,
        'position': person.position
    })

@socketio.on(MOVE_LEFT)
def on_move_left():
    person = get_person(request.sid)
    person.move_left()
    send_to_everyone(UPDATE_POSITON, {
        'id': person.id,
        'position': person.position
    })
