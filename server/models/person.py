def up(position):
    return {
        'lat': position.get('lat') + 0.00001,
        'lng': position.get('lng')
    }

def down(position):
    return {
        'lat': position.get('lat') - 0.00001,
        'lng': position.get('lng')
    }

def right(position):
    return {
        'lat': position.get('lat'),
        'lng': position.get('lng') + 0.00001
    }

def left(position):
    return {
        'lat': position.get('lat'),
        'lng': position.get('lng') - 0.00001
    }

_move_funcs = {
    'up': up,
    'down': down,
    'right': right,
    'left': left
}

class Person:
    def __init__(self, person_id, name, position):
        self.id = person_id
        self.name = name
        self.position = position
        self.gold = 100
        self.active = True

    def pack(self):
        return {
            'id': self.id,
            'name': self.name,
            'position': self.position,
            'gold': self.gold
        }

    def deactivate(self):
        self.active = False

    def move(self, direction):
        self.position = _move_funcs[direction](self.position)
