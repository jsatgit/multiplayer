class House:
    def __init__(self, position, owner):
        self.position = position
        self.owner = owner

    def pack(self):
        return {
            'position': self.position,
            'owner': self.owner,
        }
