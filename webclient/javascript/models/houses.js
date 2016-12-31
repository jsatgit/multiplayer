import Model from './model';
import Server from '../server';
import House from './house';

const _houses = {};

class Houses extends Model {
  constructor() {
    super();
    this.addServerMapping();
  }

  static get ADD_HOUSE() { return 'add_house'; }

  static get directory() {
    return _houses;
  }

  setHouses(houses) {
    houses.forEach(house => {
      this.addHouse(house);
    });
  }

  addHouse(house) {
    const houseModel = House.unpack(house);
    if (_houses[houseModel.owner]) {
      _houses[houseModel.owner].push(houseModel);
    } else {
      _houses[houseModel.owner] = [houseModel];
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
    _houses[owner].forEach(house => house.remove());
    delete _houses[owner];
  }
}

export default Houses;
