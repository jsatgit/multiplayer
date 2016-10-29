import Model from './model'
import People from './people'
import Houses from './houses'

class GameModel extends Model {
  static get SET_MAP_INFO() { return 'set_map_info'; }
  static get SET_PEOPLE() { return 'add_people'; }
  static get SET_HOUSES() { return 'add_houses'; }

  constructor() {
    super();
    this.myself = null;
    this.people = new People();
    this.houses = new Houses();
  }

  setState(state) {
    this.myself = state.myself;

    this.notify(GameModel.SET_MAP_INFO, {
      apiKey: state.apiKey,
      centerPosition: state.myself.position
    });

    this.notify(GameModel.SET_PEOPLE, this.people);
    this.people.setPeople(state.people);

    this.notify(GameModel.SET_HOUSES, this.houses);
    this.houses.setHouses(state.houses);
  }

  step(direction) {
    this.people.step(this.myself, direction);
  }
}

export default GameModel;
