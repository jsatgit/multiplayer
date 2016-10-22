class Person:
    def __init__(self, person_id, name, position):
        self.id = person_id 
        self.name = name 
        self.position = position
        self.gold = 100
        self.active = True

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'position': self.position,
            'gold': self.gold
        }

    def deactivate(self):
        self.active = False

    @staticmethod
    def serializeCollection(people):
        return [person.serialize() for person in people]

    @classmethod
    def deserialize(cls, data):
        return cls(
            id=data.get('id'),
            name=data.get('name'),
            position=data.get('position'),
            gold=data.get('gold')
        )

