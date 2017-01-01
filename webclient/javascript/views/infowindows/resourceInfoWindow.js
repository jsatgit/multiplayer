import Server from '../../server';
import Position from '../../position';
import {getPeople} from '../../models/people';
import GameModel from '../../models/gameModel';
import Mover from '../../controllers/mover';

class ResourceInfoWindow {
  constructor(resource) {
    this.resource = resource;
    this.buttonId = `${generateId(resource)}-button`;
    this.amountId = `${generateId(resource)}-amount`;
  }

  render() {
    return `
      <div>
        <div>
          ${this.resource.name}
        </div>
        <div id=\'${this.amountId}\'>
          ${this.resource.amount}
        </div>
        <div>
          <button id=\'${this.buttonId}\'>
            Take
          </button>
        </div>
      </div>
    `;
  }

  onButtonClick() {
    const my = getPeople().directory[GameModel.my.id];
    if (isTooFar(my.position, this.resource.position)) {
      Mover.moveTo(this.resource.position);
      Mover.addNextStopListener(() => this.takeResource());
    } else {
      this.takeResource();
    }
  }

  takeResource() {
    Server.takeResource(this.resource.name, this.resource.id);
  }

  updateAmount() {
    const amountView = document.getElementById(this.amountId);
    if (amountView) {
      amountView.innerHTML = this.resource.amount;
    }
  }
}

function isTooFar(position1, position2) {
  return Position.distance(position1, position2) >= 0.00009;
}

function generateId(resource) {
  return `resource-${resource.name}-${resource.id}`;
}

export default ResourceInfoWindow;
