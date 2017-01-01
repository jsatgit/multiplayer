import Model from './model';
import {getPeople} from './people';
import {getHouses} from './houses';
import Server from '../server';
import WalkerBot from '../walkerBot';
import Resources from './resources';

let _myself = null;

class GameModel extends Model {
  static get SET_MAP_INFO() { return 'set_map_info'; }
  static get SET_PEOPLE() { return 'set_people'; }
  static get SET_HOUSES() { return 'set_houses'; }
  static get SET_RESOURCES() { return 'set_resources'; }

  constructor(isBot) {
    super();
    this.isBot = isBot;
    this.resources = new Resources();
    this.addServerMapping();
  }

  static get my() {
    return _myself;
  }

  setState(state) {
    _myself = state.myself;

    this.notify(GameModel.SET_MAP_INFO, {
      apiKey: state.apiKey,
      centerPosition: state.myself.position
    });

    const people = getPeople();
    this.notify(GameModel.SET_PEOPLE, people);
    people.setPeople(state.people);

    const houses = getHouses();
    this.notify(GameModel.SET_HOUSES, houses);
    houses.setHouses(state.houses);

    this.notify(GameModel.SET_RESOURCES, this.resources);
    this.resources.setResources(state.resources);

    this.initBot();
  }

  initBot() {
    if(this.isBot) {
      const bot = new WalkerBot();
      bot.onGameLoaded();
    }
  }

  addServerMapping() {
    Server.addMapping({
      [Server.REMOVE_PERSON]: personId => {
        getPeople().removePerson(personId);
        getHouses().removeHouses(personId);
      }
    });
  }
}

export default GameModel;
