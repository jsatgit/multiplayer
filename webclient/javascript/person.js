class Person {
  constructor(id, name, position) {
    this.id = id;
    this.name = name;
    this.position = position;
  }

  serialize() {
    return {
      id: this.id,
      name: this.name,
      position: this.position
    }
  }

  static deserialize(person) {
    return new Person(person.id, person.name, person.position);
  }

  static deserializeCollection(persons) {
    return persons.map(person => {
      return Person.deserialize(person);
    });
  }
}

export default Person;
