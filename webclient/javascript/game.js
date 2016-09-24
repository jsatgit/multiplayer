import Keys from './keys';
import Server from './server';
import StatefulView from './statefulView';
import GameState from './gameState';
import Stepper from './stepper';
import View from './view';
import Map from './map';

/*
 * The game is the central object that communicates
 * between the view, server, and local gamestate
 */
class Game {
  constructor(server) {
    this.server = server;
    this.statefulView = null;
    this.gameState = null;
  }

  /*
   * Key bindings
   */
  loadKeysBindings() {
    const keys = new Keys()
    keys.setBindings({
      [Keys.UP]:     this.moveStep(Stepper.up),
      [Keys.DOWN]:   this.moveStep(Stepper.down),
      [Keys.RIGHT]:  this.moveStep(Stepper.right),
      [Keys.LEFT]:   this.moveStep(Stepper.left),
      [Keys.SPACE]:  this.buildHouse
    }, this);
  }

  updateMyPosition(dest) {
    this.statefulView.updatePersonPosition(this.gameState.myId, dest);
  }

  moveTo(dest) {
    this.gameState.myPosition = dest;
    this.server.setPosition(this.gameState.myId, dest);
    this.updateMyPosition(dest);
  }

  moveStep(stepper) {
    return () => {
      const newPosition = stepper(this.gameState.myPosition);
      this.moveTo(newPosition);
    }
  }

  buildHouse() {
    this.server.addHouse(this.gameState.myId, this.gameState.myPosition);
    this.statefulView.addHouse(this.gameState.myPosition);
  }

  /*
   * Server bindings
   */
  loadServerBindings() {
    this.server.setBindings({
      [Server.SET_POSITION]:  this.onSetPersonPosition,
      [Server.ADD_PERSON]:    this.onAddPerson,
      [Server.ADD_HOUSE]:     this.onAddHouse,
      [Server.REQUEST_STATE]: this.loadState,
      [Server.REMOVE_PERSON]: this.onRemovePerson
    }, this);
  }

  onSetPersonPosition(person) {
    this.statefulView.updatePersonPosition(person.personId, person.position)
  }

  onAddPerson(person) {
    this.statefulView.addPerson(person);
  }

  onAddHouse(house) {
    this.statefulView.addHouse(house.position);
  }

  loadState(response) {
    this.gameState = new GameState(response.myself);
    const map = new Map();
    const view = new View(map);
    this.statefulView = new StatefulView(view)
    map.load(response.apiKey, response.myself.position).then(() => {
      this.renderState(response.state);
    });
  }

  onRemovePerson(person) {
    this.statefulView.removePerson(person)
  }

  renderState(people) {
    people.forEach(person => {
      this.statefulView.addPerson(person)
      person.houses.forEach(house => {
        this.statefulView.addHouse(house.position);
      });
    })
  }

  load() {
    this.loadKeysBindings();
    this.loadServerBindings();
    this.server.requestState();
  }
}

export default Game;
