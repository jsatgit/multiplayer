from bootstrap import socketio
from flask import request
from game import get_person
from game import create_house 
from emitter import send_to_everyone

ADD_HOUSE = 'add_house'

@socketio.on(ADD_HOUSE)
def on_add_house():
    person = get_person(request.sid)
    house = create_house(person)
    send_to_everyone(ADD_HOUSE, house.pack())
