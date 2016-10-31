import Person from './person'
import Model from './model'
import Server from '../server'

const _people = {};

class People extends Model {
  constructor() {
    super();
    this.addServerMapping();
  }

  static get ADD_PERSON() { return 'add_person'; }

  static get directory() {
    return _people;
  }

  setPeople(people) {
    people.forEach(person => {
      this.addPerson(person);
    });
  }

  addPerson(person) {
    const personModel = Person.unpack(person);
    _people[personModel.id] = personModel;
    this.notify(People.ADD_PERSON, personModel);
  }

  static unpack(people) {
    const unpackedPeople = people.reduce((peopleDict, person) => {
      peopleDict[person.id] = Person.unpack(person);
      return peopleDict;
    }, {});
    return new People(unpackedPeople);
  }

  addServerMapping() {
    Server.addMapping({
      [Server.UPDATE_POSITION]: personUpdates => {
        const person = _people[personUpdates.id];
        person.updatePosition(personUpdates.position);
      },
      [Server.ADD_PERSON]: person => {
        this.addPerson(person);
      },
      [Server.REMOVE_PERSON]: personId => {
        _people[personId].remove();
        delete _people[personId];
      }
    });
  }
}

export default People;
