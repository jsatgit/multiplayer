import View from './view';
import Person from './person';
import {ADD_PERSON} from '../models/people';

class People extends View {
  constructor() {
    super();
  }

  handler() {
    return {
      [ADD_PERSON]: personModel => {
        const person = new Person();
        person.subscribe(personModel);
        person.render(personModel);
      }
    };
  }
}

export default People;
