from app import socketio
from flask import request
from app import flask_app
from emitter import send_to_everyone_else
from emitter import send_back
from game import create_person
from game import pack_people
from game import pack_houses
from game import get_person 

REGISTER_USER = 'register_user'
GAME_STATE = 'game_state'
ADD_PERSON = 'add_person'
REMOVE_PERSON = 'remove_person'
DISCONNECT = 'disconnect'

@socketio.on(REGISTER_USER)
def on_register_user(user):
    person = create_person(name=user['name'], sid=request.sid)
    send_back(GAME_STATE, {
        'myself': person.pack(),
        'people': pack_people(),
        'houses': pack_houses(),
        'apiKey': flask_app.config.get('GOOGLE_MAPS_API_KEY')
    })
    send_to_everyone_else(ADD_PERSON, person.pack());

@socketio.on(DISCONNECT)
def on_disconnect():
    person = get_person(request.sid) 
    person.deactivate()
    send_to_everyone_else(REMOVE_PERSON, person.id);
