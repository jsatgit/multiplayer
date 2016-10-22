class House:
    def __init__(self, position, owner):
        self.position = position
        self.owner = owner

    def serialize(self):
        return {
            'position': self.position,
            'owner': self.owner,
        }

    @staticmethod
    def serializeCollection(houses):
        return [house.serialize() for house in houses]

    @classmethod
    def deserialize(cls, data):
        return cls(
            position=data.get('position'),
            owner=data.get('owner')
        )

