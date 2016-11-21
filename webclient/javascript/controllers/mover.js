import Map from '../map'
import People from '../models/people'
import GameModel from '../models/gameModel'
import Person from '../models/person'
import Server from '../server'

let timeout = null;
const INTERVAL = 20;
const stopListeners = [];
let nextStopListeners = [];

class Mover {
  static listenToClicks() {
    addMapMapping();
  }

  static addStopListener(callback) {
    stopListeners.push(callback);
  }

  static addNextStopListener(callback) {
    nextStopListeners.push(callback);
  }

  static stop() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    stopListeners.forEach(callback => callback());
    nextStopListeners.forEach(callback => callback());
    nextStopListeners = [];
  }

  static moveTo(targetPosition) {
    if (timeout) {
      Mover.stop();
    }
    recurseMoveTo(targetPosition);
  }
}

function recurseMoveTo(targetPosition) {
  const my = People.directory[GameModel.my.id];
  if (Person.isClose(my.position, targetPosition)) {
    Mover.stop();
  } else {
    const step = Person.stepTowards(
      my.position,
      targetPosition
    );
    Server.move({ step: step });
    timeout = setTimeout(() => recurseMoveTo(targetPosition), INTERVAL);
  }
}

function addMapMapping() {
  Map.addMapping({
    [Map.CLICK]: targetPosition => {
      Mover.moveTo(targetPosition);
    }
  })
}

export default Mover;
