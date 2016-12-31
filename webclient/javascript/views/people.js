import View from './view';
import Person from './person';
import PeopleModel from '../models/people';

class People extends View {
  constructor() {
    super();
  }

  handler() {
    return {
      [PeopleModel.ADD_PERSON]: personModel => {
        const person = new Person();
        person.subscribe(personModel);
        person.render(personModel);
      }
    };
  }
}

export default People;
