import Model from './model'
import Position from '../position'

class Person extends Model {
  constructor(id, name, position, gold) {
    super();
    this.id = id;
    this.name = name;
    this.position = position;
    this.gold = gold;
  }

  static get UPDATE_POSITION() { return 'update_position'; }
  static get REMOVE() { return 'remove'; }
  static get STEP_SIZE() { return 0.00001 }

  static unpack(person) {
    return new Person(
      person.id,
      person.name,
      person.position,
      person.gold
    );
  }

  updatePosition(position) {
    this.position = position;
    this.notify(Person.UPDATE_POSITION, position)
  }

  remove() {
    this.notify(Person.REMOVE)
  }

  static stepTowards(initialPosition, finalPosition) {
    const latDiff = finalPosition.lat - initialPosition.lat;
    const lngDiff = finalPosition.lng - initialPosition.lng;
    const distance = Position.distance(initialPosition, finalPosition);
    return {
      lat: Person.STEP_SIZE * latDiff / distance,
      lng: Person.STEP_SIZE * lngDiff / distance
    }
  }

  static isClose(position1, position2) {
    return Position.distance(position1, position2) < Person.STEP_SIZE;
  }
}

export default Person;
