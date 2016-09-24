from flask import Flask
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

class GameState:
    def __init__(self):
        self.person_id = 0;
        self.people = [];

    def get_initial_person_state(self):
        return {
            'id': self.person_id,
            'position': {
                'lat': 49.2838,
                'lng': -122.7932
            },
            'houses': []
        }

    def add_person(self, person):
        self.people.append(person)
        self.person_id += 1

    def create_person(self):
        person = self.get_initial_person_state()
        self.add_person(person)
        print 'created person {}'.format(person)
        return person

    def set_position(self, personId, position):
        self.people[personId]['position'] = position

    def add_house(self, personId, position):
        self.people[personId]['houses'].append({
            'position': position
        })

    @property
    def state(self):
        return self.people

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

@socketio.on('addHouse')
def on_add_house(data):
    game.add_house(data['personId'], data['position'])
    send_to_everyone_else('addHouse', data);

@socketio.on('setPosition')
def on_set_position(data):
    game.set_position(data['personId'], data['position'])
    send_to_everyone_else('setPosition', data);

@socketio.on('requestState')
def on_request_state():
    person = game.create_person()
    send_back('requestState', {
        'myself': person,
        'state': game.state
    })
    send_to_everyone_else('addPerson', person);

if __name__ == '__main__':
    socketio.run(app)
