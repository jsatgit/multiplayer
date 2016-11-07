class House:
    def __init__(self, house_id, position, owner):
        self.id = house_id 
        self.position = position
        self.owner = owner

    def pack(self):
        return {
            'id': self.id,
            'position': self.position,
            'owner': self.owner,
        }
