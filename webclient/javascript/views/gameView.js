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
      },
      [GameModel.SET_RESOURCES]: resources => {
        addResource('yellow', resources.oil);
        addResource('orange', resources.natural_gas);
        addResource('green', resources.phosphorus);
        addResource('black', resources.coal);
      }
    }
  }
}

function addResource(color, resources) {
  resources.forEach(resource => {
    Map.addMarker({
      position: resource.position,
      icon: {
        path: 'M -2,0 0,-2 2,0 0,2 z',
        strokeColor: color,
        fillColor: color,
        fillOpacity: 1,
        scale: 3
      },
    });
  });
}

export default GameView;
