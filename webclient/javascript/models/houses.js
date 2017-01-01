import Model from './model';
import House from './house';
import Server from '../server';

let houses = null;

/**
 * Triggered when a house model is added
 */
export const ADD_HOUSE = 'add_house';

/**
 * Representation of all the houses on the map
 */
class Houses extends Model {
  constructor() {
    super();
    this.addServerMapping();
    this._houses = {};
  }

  addHouse(house) {
    const houseModel = House.unpack(house);
    if (this._houses[houseModel.owner]) {
      this._houses[houseModel.owner].push(houseModel);
    } else {
      this._houses[houseModel.owner] = [houseModel];
    }
    this.notify(ADD_HOUSE, houseModel);
  }

  addServerMapping() {
    Server.addMapping({
      [Server.ADD_HOUSE]: house => {
        this.addHouse(house);
      }
    });
  }

  /**
   * Removes houses belonging to a person
   * @param {Person} owner - person whose house/s to remove
   */
  removeHouses(owner) {
    this._houses[owner].forEach(house => house.remove());
    delete this._houses[owner];
  }

  /**
   * bulk add houses
   * @param {House[]}
   */
  setHouses(houses) {
    houses.forEach(house => {
      this.addHouse(house);
    });
  }

  /**
   * internal storage of houses
   * @returns {Object}
   */
  get directory() {
    return this._houses;
  }
}

/**
 * Get global house object
 */
export function getHouses() {
  if (!houses) {
    houses = new Houses();
  }
  return houses;
}
