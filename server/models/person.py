class Person:
    STEP_SIZE = 0.00001

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

    def move_direction(self, direction):
        self.position = _move_direction[direction](self.position)

    def move_step(self, step):
        self.position = make_step(
            position=self.position,
            lat=step.get('lat'),
            lng=step.get('lng')
        )

def make_step(position, lat=0, lng=0):
    return {
        'lat': position.get('lat') + lat,
        'lng': position.get('lng') + lng,
    }

_move_direction = {
    'up': lambda position: make_step(position, lat=Person.STEP_SIZE),
    'down': lambda position: make_step(position, lat=-Person.STEP_SIZE),
    'right': lambda position: make_step(position, lng=Person.STEP_SIZE),
    'left': lambda position: make_step(position, lng=-Person.STEP_SIZE)
}
