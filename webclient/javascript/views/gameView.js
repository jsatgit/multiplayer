import View from './view'
import GameModel from '../models/gameModel'
import Map from '../map'
import People from './people'
import Houses from './houses'

class GameView extends View {
  constructor() {
    super();
    this.people = new People();
    this.houses = new Houses();
  }

  handler() {
    return {
      [GameModel.SET_MAP_INFO]: mapInfo => {
        Map.load(mapInfo);
      },
      [GameModel.SET_PEOPLE]: peopleModel => {
        this.people.subscribe(peopleModel);
      },
      [GameModel.SET_HOUSES]: housesModel => {
        this.houses.subscribe(housesModel);
      }
    }
  }
}

export default GameView;
