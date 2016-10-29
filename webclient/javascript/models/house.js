import Model from './model' 

class House extends Model {
  constructor(position, owner) {
    super();
    this.position = position;
    this.owner = owner;
  }

  static unpack(house) {
    return new House(
        house.position,
        house.owner
    );
  }
}

export default House;
