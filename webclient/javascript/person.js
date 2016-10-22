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

  static deserializeList(people) {
    return people.map(person => {
      return Person.deserialize(person);
    });
  }

  static deserializeDict(people) {
    return people.reduce((peopleDict, person) => {
      peopleDict[person.id] = Person.deserialize(person);
      return peopleDict;
    }, {});
  }
}

export default Person;
