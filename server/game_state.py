from person import Person
from house import House

class GameState:
    def __init__(self):
        self.person_id = 0
        self.people = []
        self.houses = []

    def get_initial_person_state(self, name):
        return Person(
            person_id=self.person_id,
            name=name,
            position={
                'lat': 49.2838,
                'lng': -122.7932
            }
        )

    def add_person(self, person):
        self.people.append(person)
        self.person_id += 1

    def create_person(self, person_details):
        person = self.get_initial_person_state(
            name=person_details['name']
        )
        self.add_person(person)
        print 'created person {}'.format(person)
        return person

    def set_position(self, personId, position):
        self.people[personId].position = position

    def add_house(self, house):
        self.houses.append(house)

    @property
    def serialized_state(self):
        return {
            'people': Person.serializeCollection(self.people),
            'houses': House.serializeCollection(self.houses)
        }
