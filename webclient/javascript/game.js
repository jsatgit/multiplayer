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
    // TODO how can we move this method to a more natural place
    const owner = this.gameState.getHouseOwner(house)
    this.statefulView.addHouse(house, owner);
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
    this.gameState.updatePersonPosition(person.id, person.position)
    this.statefulView.updatePersonPosition(person.id, person.position)
  }

  onAddPerson(data) {
    const person = Person.deserialize(data)
    this.gameState.addPerson(person)
    this.statefulView.addPerson(person);
  }

  onAddHouse(data) {
    // TODO do deserialization somewhere else
    const house = House.deserialize(data);
    const owner = this.gameState.getHouseOwner(house);
    this.gameState.addHouse(house);
    this.statefulView.addHouse(house, owner);
  }

  loadState(response) {
    const {myself, state, apiKey} = response;
    // TODO clean up loading logic
    const map = new Map();
    const view = new View(map);
    // TODO do deserialization somewhere else
    const deserializedState = this.deserializeState(state);
    this.statefulView = new StatefulView(view)
    this.gameState = new GameState(
      myself,
      deserializedState.peopleDict,
      deserializedState.houses
    );
    map.load(apiKey, myself.position).then(() => {
      this.renderState(deserializedState);
    });
  }

  deserializeState(state) {
    return {
      'peopleDict': Person.deserializeDict(state.people),
      'peopleList': Person.deserializeList(state.people),
      'houses': House.deserializeList(state.houses)
    }
  }

  onRemovePerson(person) {
    this.gameState.removePerson(person);
    this.statefulView.removePerson(person);
  }

  renderPeople(people) {
    people.forEach(person => {
      this.statefulView.addPerson(person);
    })
  }

  renderHouses(houses) {
    houses.forEach(house => {
      const owner = this.gameState.getHouseOwner(house)
      this.statefulView.addHouse(house, owner);
    });
  }

  renderState(state) {
    this.renderPeople(state['peopleList']);
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
