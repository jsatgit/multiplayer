import Keys from './keys';
import Server from './server';
import StatefulView from './statefulView';
import GameState from './gameState';
import Stepper from './stepper';
import View from './view';
import Map from './map';
import House from './house';
import Person from './person';

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
    const house = new House(this.gameState.myPosition, this.gameState.myId);
    this.server.addHouse(house);
    this.statefulView.addHouse(house);
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

  onAddHouse(data) {
    // TODO do deserialization somewhere else
    const house = House.deserialize(data)
    this.statefulView.addHouse(house);
  }

  loadState(response) {
    this.gameState = new GameState(response.myself);
    const map = new Map();
    const view = new View(map);
    this.statefulView = new StatefulView(view)
    map.load(response.apiKey, response.myself.position).then(() => {
      // TODO do deserialization somewhere else
      const state = this.deserializeState(response.state)
      this.renderState(state);
    });
  }

  deserializeState(state) {
    return {
      'houses': House.deserializeCollection(state['houses']),
      'people': Person.deserializeCollection(state['people'])
    }
  }

  onRemovePerson(person) {
    this.statefulView.removePerson(person)
  }

  renderPeople(people) {
    people.forEach(person => {
      this.statefulView.addPerson(person)
    })
  }

  renderHouses(houses) {
    houses.forEach(house => {
      this.statefulView.addHouse(house);
    });
  }

  renderState(state) {
    this.renderPeople(state['people']);
    this.renderHouses(state['houses']);
  }

  load(formResult) {
    this.loadKeysBindings();
    this.loadServerBindings();
    this.server.requestState(formResult);
  }

  show() {
    document.getElementById('map').style.display = 'block';
  }
}

export default Game;
