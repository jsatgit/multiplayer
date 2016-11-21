from collections import defaultdict
from math import sqrt

class Person:
    STEP_SIZE = 0.00001

    def __init__(self, person_id, name, position):
        self.id = person_id
        self.name = name
        self.position = position
        self.active = True
        self.inventory = defaultdict(int)

    def pack(self):
        return {
            'id': self.id,
            'name': self.name,
            'position': self.position,
            'inventory': self.inventory
        }

    def deactivate(self):
        self.active = False

    def move_direction(self, direction):
        self.position = _move_direction[direction](self.position)

    def move_step(self, step):
        self.position = make_step(
            position=self.position,
            lat=step.get('lat'),
            lng=step.get('lng')
        )

    def canTakeResource(self, resource):
        return close(self.position, resource.get('position'))

    def addToInventory(self, items):
        for name, value in items.iteritems():
            self.inventory[name] += value




def make_step(position, lat=0, lng=0):
    return {
        'lat': position.get('lat') + lat,
        'lng': position.get('lng') + lng,
    }

def distance(position1, position2):
    latDiff = position1.get('lat') - position2.get('lat')
    lngDiff = position1.get('lng') - position2.get('lng')
    return sqrt(latDiff*latDiff + lngDiff*lngDiff)

def close(position1, position2):
    return distance(position1, position2) < 0.00009


_move_direction = {
    'up': lambda position: make_step(position, lat=Person.STEP_SIZE),
    'down': lambda position: make_step(position, lat=-Person.STEP_SIZE),
    'right': lambda position: make_step(position, lng=Person.STEP_SIZE),
    'left': lambda position: make_step(position, lng=-Person.STEP_SIZE)
}
