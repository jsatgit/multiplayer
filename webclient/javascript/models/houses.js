import Model from './model' 
import Server from '../server'
import House from './house'

class Houses extends Model {
  constructor() {
    super();
    this.houses = [];
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
    this.houses.push(houseModel);
    this.notify(Houses.ADD_HOUSE, houseModel);
  }

  static unpack(houses) {
    const unpackedHouses = houses.map(house => {
      return House.unpack(house);
    });
    return new Houses(unpackedHouses);
  }

  addServerMapping() {
    Server.addMapping({
      [Server.ADD_HOUSE]: house => {
        this.addHouse(house);
      }
    });
  }
}

export default Houses;
