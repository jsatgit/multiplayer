import Model from './model';
import Person from './person';
import Server from '../server';

let people = null;

/**
 * Triggered when a person model is added
 */
export const ADD_PERSON = 'add_person';

/**
 * Representation of all the people on the map
 */
class People extends Model {
  constructor() {
    super();
    this.addServerMapping();
    this._people = {};
  }


  addPerson(person) {
    const personModel = Person.unpack(person);
    this._people[personModel.id] = personModel;
    this.notify(ADD_PERSON, personModel);
  }

  addServerMapping() {
    Server.addMapping({
      [Server.UPDATE_POSITION]: personUpdates => {
        const person = this._people[personUpdates.id];
        person.updatePosition(personUpdates.position);
      },
      [Server.ADD_PERSON]: person => {
        this.addPerson(person);
      },
      [Server.RESOURCE]: response => {
        const { person_id, resource_name, inventory_gain } = response;
        const person = this._people[person_id];
        person.addToInventory({[resource_name]: inventory_gain});
      }
    });
  }

  /**
   * Removes person given an id
   * @param {number} personId - id of a person
   */
  removePerson(personId) {
    this._people[personId].remove();
    delete this._people[personId];
  }

  /**
   * bulk add people
   * @param {Person[]}
   */
  setPeople(people) {
    people.forEach(person => {
      this.addPerson(person);
    });
  }

  /**
   * internal storage of people
   * @returns {Object}
   */
  get directory() {
    return this._people;
  }
}

/**
 * Get global house object
 */
export function getPeople() {
  if (!people) {
    people = new People();
  }
  return people;
}
