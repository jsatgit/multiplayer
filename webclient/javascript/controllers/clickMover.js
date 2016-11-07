import Map from '../map'
import People from '../models/people'
import GameModel from '../models/gameModel'
import Person from '../models/person'
import Server from '../server'

let timeout = null;

class ClickMover {
  // TODO rename this classs
  static get INTERVAL() { return 20; }

  static enable() {
    addMapMapping();
  }

  static start(targetPosition) {
    timeout = setTimeout(
      () => recurseMove(targetPosition),
      ClickMover.INTERVAL
    );
  }

  static stop() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  }
}

function addMapMapping() {
  Map.addMapping({
    [Map.CLICK]: targetPosition => {
      ClickMover.stop();
      recurseMove(targetPosition);
    }
  })
}


function recurseMove(targetPosition) {
  const my = People.directory[GameModel.my.id];
  if (Person.isClose(my.position, targetPosition)) {
    ClickMover.stop();
  } else {
    const step = Person.stepTowards(
      my.position,
      targetPosition
    );
    Server.move({ step: step });
    ClickMover.start(targetPosition);
  }
}


export default ClickMover;
