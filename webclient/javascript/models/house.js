import Model from './model' 

class House extends Model {
  constructor(position, owner) {
    super();
    this.position = position;
    this.owner = owner;
  }

  static get REMOVE() { return 'remove'; }

  static unpack(house) {
    return new House(
        house.position,
        house.owner
    );
  }

  remove() {
    this.notify(House.REMOVE)
  }
}

export default House;
