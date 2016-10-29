import Model from './model' 

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
}

export default Person;
