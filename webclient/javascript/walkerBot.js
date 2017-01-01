import Bot from './bot';
import {getHouses} from './models/houses.js';
import Mover from './controllers/mover';

function randomItem(lst) {
  return lst[Math.floor(Math.random() * lst.length)];
}

const WALK = 'walk';


class WalkerBot extends Bot {
  constructor() {
    super();
    Mover.addStopListener(() => this.onActionFinished(WALK));
  }

  onGameLoaded() {
    moveToRandomHouse();
  }

  onActionFinished(action) {
    switch(action) {
      case WALK:
        moveToRandomHouse();
    }
  }
}

function moveToRandomHouse() {
  const houses = getHouses();
  const owners = Object.keys(houses.directory);
  if (owners.length) {
    const randomOwner = randomItem(owners);
    const directory = houses.directory[randomOwner];
    const house = randomItem(directory);
    Mover.moveTo(house.position);
  }
}

export default WalkerBot;
