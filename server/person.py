class Person:
    def __init__(self, person_id, name, position):
        self.id = person_id 
        self.name = name 
        self.position = position

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'position': self.position
        }

    @staticmethod
    def serializeCollection(people):
        return [person.serialize() for person in people]

    @classmethod
    def deserialize(cls, data):
        return cls(
            id=data.get('id'),
            name=data.get('name'),
            position=data.get('position')
        )

