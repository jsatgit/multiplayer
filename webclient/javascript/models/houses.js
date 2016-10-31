import Model from './model'
import Server from '../server'
import House from './house'

class Houses extends Model {
  constructor() {
    super();
    this.houses = {};
    this.addServerMapping();
  }

  static get ADD_HOUSE() { return 'add_house'; }

  setHouses(houses) {
    houses.forEach(house => {
      this.addHouse(house);
    });
  }

  addHouse(house) {
    const houseModel = House.unpack(house);
    if (this.houses[houseModel.owner]) {
      this.houses[houseModel.owner].push(houseModel);
    } else {
      this.houses[houseModel.owner] = [houseModel];
    }
    this.notify(Houses.ADD_HOUSE, houseModel);
  }

  addServerMapping() {
    Server.addMapping({
      [Server.ADD_HOUSE]: house => {
        this.addHouse(house);
      }
    });
  }

  removeHouses(owner) {
    this.houses[owner].forEach(house => house.remove());
    delete this.houses[owner];
  }
}

export default Houses;
