from models.person import Person
from models.house import House

import models.resources as resources

class Game:
    person_id = 0
    house_id = 0
    people = []
    houses = []
    sid_to_person = {}

def init_game():
    resources.create_all()

def create_person(name, sid):
    person = Person(
        person_id=Game.person_id,
        name=name,
        position=resources.COQUITLAM
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

def get_person_by_id(pid):
    return Game.people[pid]

def pack_people():
    return [person.pack() for person in Game.people if person.active]

def pack_houses():
    return [
        house.pack() for house in Game.houses
        if Game.people[house.owner].active
    ]

def pack_resources():
    return {
        resource_name : ResourceClass.rows()
        for resource_name, ResourceClass
        in resources.nameToResourceClass.iteritems()
    }

def get_resource(name, resource_id):
    ResourceClass = resources.nameToResourceClass.get(name)
    return ResourceClass.get(resource_id)
