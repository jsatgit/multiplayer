import View from './view';
import House from './house';
import HousesModel from '../models/houses';

class Houses extends View {
  constructor() {
    super();
  }

  handler() {
    return {
      [HousesModel.ADD_HOUSE]: houseModel => {
        const house = new House();
        house.subscribe(houseModel);
        house.render(houseModel);
      }
    };
  }
}

export default Houses;
