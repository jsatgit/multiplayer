from models.person import Person
from models.house import House

COQUITLAM = {
    'lat': 49.2838,
    'lng': -122.7932
}

class Game:
    person_id = 0
    house_id = 0
    people = []
    houses = []
    sid_to_person = {}

def create_person(name, sid):
    person = Person(
        person_id=Game.person_id,
        name=name,
        position=COQUITLAM
    )
    Game.person_id += 1
    Game.people.append(person)
    Game.sid_to_person[sid] = person
    return person

def create_house(person):
    house = House(
        house_id=Game.house_id,
        position=person.position,
        owner=person.id
    )
    Game.house_id += 1
    Game.houses.append(house)
    return house

def get_person(sid):
    return Game.sid_to_person.get(sid)

def pack_people():
    return [person.pack() for person in Game.people if person.active]

def pack_houses():
    return [
        house.pack() for house in Game.houses
        if Game.people[house.owner].active
    ]
