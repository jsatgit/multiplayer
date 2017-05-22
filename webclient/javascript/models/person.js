import Model from './model';
import Position from '../position';

class Person extends Model {
  constructor(id, name, position, inventory) {
    super();
    this.id = id;
    this.name = name;
    this.position = position;
    this.inventory = inventory;
  }

  static get UPDATE_POSITION() { return 'update_position'; }
  static get UPDATE_INVENTORY() { return 'update_inventory'; }
  static get REMOVE() { return 'remove'; }
  static get STEP_SIZE() { return 0.00001; }

  static unpack(person) {
    return new Person(
      person.id,
      person.name,
      person.position,
      person.inventory
    );
  }

  updatePosition(position) {
    this.position = position;
    this.notify(Person.UPDATE_POSITION, position);
  }

  remove() {
    this.notify(Person.REMOVE);
  }

  addToInventory(items) {
    for (const name in items) {
      if (this.inventory[name]) {
        this.inventory[name] += items[name];
      } else {
        this.inventory[name] = 1;
      }
    }
    this.notify(Person.UPDATE_INVENTORY);
  }

  removeFromInventory(items) {
    for (const name in items) {
      if (this.inventory[name] && this.inventory[name] - items[name] >= 0) {
        this.inventory[name] -= items[name];
      } 
    }
    this.notify(Person.UPDATE_INVENTORY);
  }

  static stepTowards(initialPosition, finalPosition) {
    const latDiff = finalPosition.lat - initialPosition.lat;
    const lngDiff = finalPosition.lng - initialPosition.lng;
    const distance = Position.distance(initialPosition, finalPosition);
    return {
      lat: Person.STEP_SIZE * latDiff / distance,
      lng: Person.STEP_SIZE * lngDiff / distance
    };
  }

  static isClose(position1, position2) {
    return Position.distance(position1, position2) < Person.STEP_SIZE;
  }
}

export default Person;
