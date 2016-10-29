from flask import Flask, request
from flask_socketio import SocketIO, emit
from game_state import GameState
from house import House

app = Flask(__name__)
app.config.from_object('config')
socketio = SocketIO(app)
game = GameState()

def send_to_everyone_else(event, data):
    print 'to everyone else: [{event}] - {data}'.format(
        event=event,
        data=data
    )
    emit(event, data, broadcast=True, include_self=False)

def send_to_everyone(event, data):
    print 'to everyone: [{event}] - {data}'.format(
        event=event,
        data=data
    )
    emit(event, data, broadcast=True)

def send_back(event, data):
    print 'to client: [{event}] - {data}'.format(
        event=event,
        data=data
    )
    emit(event, data)

sid_to_person_map = {}

def register_person(socket_id, person):
    sid_to_person_map[socket_id] = person;

def pop_registered_person(socket_id):
    return sid_to_person_map.pop(socket_id)

add_house = 'addHouse'
set_position = 'setPosition'
disconnect = 'disconnect'

REGISTER_USER = 'register_user'
GAME_STATE = 'game_state'
MOVE_UP = 'move_up'
MOVE_DOWN = 'move_down'
MOVE_RIGHT = 'move_right'
MOVE_LEFT = 'move_left'
ADD_HOUSE = 'add_house'
UPDATE_POSITON = 'update_position'
ADD_PERSON = 'add_person'
REMOVE_PERSON = 'remove_person'


@socketio.on(add_house)
def on_add_house(data):
    house = House.deserialize(data)
    game.add_house(house)
    send_to_everyone_else(add_house, data);

@socketio.on(set_position)
def on_set_position(data):
    game.set_position(data['id'], data['position'])
    send_to_everyone_else(set_position, data);

@socketio.on(REGISTER_USER)
def on_register_user(person_details):
    person = game.create_person(person_details)
    register_person(request.sid, person)
    send_back(GAME_STATE, {
        'myself': person.serialize(),
        'people': game.serialized_people,
        'houses': game.serialized_houses,
        'apiKey': app.config.get('GOOGLE_MAPS_API_KEY')
    })
    send_to_everyone_else(ADD_PERSON, person.serialize());

@socketio.on(disconnect)
def on_user_disconnect():
    person = pop_registered_person(request.sid)
    person.deactivate()
    send_to_everyone_else(REMOVE_PERSON, person.id);

@socketio.on(MOVE_UP)
def on_move_up():
    person = sid_to_person_map.get(request.sid)
    person.move_up()
    send_to_everyone(UPDATE_POSITON, {
        'id': person.id,
        'position': person.position
    })

@socketio.on(MOVE_DOWN)
def on_move_down():
    person = sid_to_person_map.get(request.sid)
    person.move_down()
    send_to_everyone(UPDATE_POSITON, {
        'id': person.id,
        'position': person.position
    })

@socketio.on(MOVE_RIGHT)
def on_move_right():
    person = sid_to_person_map.get(request.sid)
    person.move_right()
    send_to_everyone(UPDATE_POSITON, {
        'id': person.id,
        'position': person.position
    })

@socketio.on(MOVE_LEFT)
def on_move_left():
    person = sid_to_person_map.get(request.sid)
    person.move_left()
    send_to_everyone(UPDATE_POSITON, {
        'id': person.id,
        'position': person.position
    })

@socketio.on(ADD_HOUSE)
def on_add_house():
    person = sid_to_person_map.get(request.sid)
    house = House(person.position, person.id)
    game.add_house(house)
    send_to_everyone(ADD_HOUSE, house.serialize())


if __name__ == '__main__':
    socketio.run(app, host='', port=5000)
