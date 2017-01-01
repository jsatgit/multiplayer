import View from './view';
import House from './house';
import {ADD_HOUSE} from '../models/houses';

class Houses extends View {
  constructor() {
    super();
  }

  handler() {
    return {
      [ADD_HOUSE]: houseModel => {
        const house = new House();
        house.subscribe(houseModel);
        house.render(houseModel);
      }
    };
  }
}

export default Houses;
