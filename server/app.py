from flask import Flask, request
from flask_socketio import SocketIO, emit
from game_state import GameState
from house import House

app = Flask(__name__)
app.config.from_object('config')
socketio = SocketIO(app)
game = GameState()

def send_to_everyone_else(event, data):
    print 'to everyone: {event} and data: {data}'.format(
        event=event,
        data=data
    )
    emit(event, data, broadcast=True, include_self=False)

def send_back(event, data):
    print 'to client: {event} and data: {data}'.format(
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
request_state = 'requestState'
disconnect = 'disconnect'

@socketio.on(add_house)
def on_add_house(data):
    house = House.deserialize(data)
    game.add_house(house)
    send_to_everyone_else(add_house, data);

@socketio.on(set_position)
def on_set_position(data):
    game.set_position(data['id'], data['position'])
    send_to_everyone_else(set_position, data);

@socketio.on(request_state)
def on_request_state(person_details):
    person = game.create_person(person_details)
    register_person(request.sid, person)
    send_back(request_state, {
        'myself': person.serialize(),
        'state': game.serialized_state,
        'apiKey': app.config.get('GOOGLE_MAPS_API_KEY')
    })
    send_to_everyone_else('addPerson', person.serialize());

@socketio.on(disconnect)
def on_user_disconnect():
    person = pop_registered_person(request.sid)
    person.deactivate()
    send_to_everyone_else('removePerson', person.serialize());

if __name__ == '__main__':
    socketio.run(app, host='', port=5000)
