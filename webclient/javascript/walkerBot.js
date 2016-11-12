import Bot from './bot';
import Houses from './models/houses.js';
import Mover from './controllers/mover';

function randomItem(lst) {
  return lst[Math.floor(Math.random() * lst.length)];
}

class WalkerBot extends Bot {
  onGameLoaded() {
    const owners = Object.keys(Houses.directory);
    const randomOwner = randomItem(owners);
    const houses = Houses.directory[randomOwner];
    const house = randomItem(houses);
    Mover.moveTo(house.position);
  }
}

export default WalkerBot;
