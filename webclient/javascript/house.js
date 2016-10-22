class House {
  constructor(position, owner) {
    this.position = position;
    this.owner = owner;
  }

  serialize() {
    return {
      position: this.position,
      owner: this.owner
    }
  }

  static deserialize(house) {
    return new House(house.position, house.owner);
  }

  //TODO Consider a baseclass for these
  static deserializeList(houses) {
    return houses.map(house => {
      return House.deserialize(house);
    });
  }
}

export default House;
