import Map from '../map'
import People from '../models/people'
import GameModel from '../models/gameModel'
import Person from '../models/person'
import Server from '../server'

let timeout = null;
const INTERVAL = 20;

class Mover {

  static listenToClicks() {
    addMapMapping();
  }

  static stop() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  }

  static moveTo(targetPosition) {
    const my = People.directory[GameModel.my.id];
    if (Person.isClose(my.position, targetPosition)) {
      Mover.stop();
    } else {
      const step = Person.stepTowards(
        my.position,
        targetPosition
      );
      Server.move({ step: step });
      recurseMoveTo(targetPosition);
    }
  }
}

function recurseMoveTo(targetPosition) {
  timeout = setTimeout(() => Mover.moveTo(targetPosition), INTERVAL);
}

function addMapMapping() {
  Map.addMapping({
    [Map.CLICK]: targetPosition => {
      Mover.stop();
      Mover.moveTo(targetPosition);
    }
  })
}

export default Mover;
