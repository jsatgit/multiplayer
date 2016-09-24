import Keys from './keys';
import Server from './server';

const PERSON_ICON = 'https://www.apec-econ.ca/system/style/images/icon-small-person.png'
const HOUSE_ICON = 'http://findicons.com/files/icons/1672/mono/32/home.png'


class Game {
  constructor(map, server) {
    this.map = map;
    this.server = server;
    this.INCREMENT = 0.00001;
    // TODO create a class for "myself"
    this.myself = null;
    this.peopleMarkers = {};
  }

  addPersonToView(position) {
    return this.map.addMarker(position, PERSON_ICON);
  }

  setPersonPositionToView(personId, position) {
    this.peopleMarkers[personId].setPosition(position);
  }

  setMyPositionToView(dest) {
    this.setPersonPositionToView(this.myself.id, dest);
  }

  moveTo(dest) {
    this.setMyPosition(dest);
    this.server.setPosition(this.myself.id, dest);
    this.setMyPositionToView(dest);
  }

  setMyPosition(position) {
    this.myself.position = position;
  }

  currentLat() {
    return this.myself.position.lat;
  }

  currentLng() {
    return this.myself.position.lng;
  }

  moveUp() {
    this.moveTo({
      lat: this.currentLat() + this.INCREMENT,
      lng: this.currentLng()
    });
  }

  moveDown() {
    this.moveTo({
      lat: this.currentLat() - this.INCREMENT,
      lng: this.currentLng()
    });
  }

  moveRight() {
    this.moveTo({
      lat: this.currentLat(),
      lng: this.currentLng() + this.INCREMENT
    });
  }

  moveLeft() {
    this.moveTo({
      lat: this.currentLat(),
      lng: this.currentLng() - this.INCREMENT
    });
  }

  addHouseToView(position) {
    return this.map.addMarker(position, HOUSE_ICON);
  }

  buildHouse() {
    this.server.addHouse(this.myself.id, this.myself.position);
    return this.addHouseToView(this.myself.position);
  }

  onAddPerson(person) {
    this.addPersonToGame(person);
  }

  onAddHouse(house) {
    this.addHouseToView(house.position);
  }

  onSetPersonPosition(person) {
    this.setPersonPositionToView(person.personId, person.position)
  }

  loadKeysBindings() {
    const keys = new Keys()
    keys.setBindings({
      [Keys.UP]:     this.moveUp,
      [Keys.DOWN]:   this.moveDown,
      [Keys.RIGHT]:  this.moveRight,
      [Keys.LEFT]:   this.moveLeft,
      [Keys.SPACE]:  this.buildHouse
    }, this);
  }

  setGame(response) {
    this.renderState(response.state);
    this.setIdentity(response.myself);
    // TODO these two statements should be interchangable
    // find a way to not depend on marker creation
  }

  setIdentity(myself) {
    this.myself = myself;
  }

  addPersonToGame(person) {
    var personMarker = this.addPersonToView(person.position);
    this.peopleMarkers[person.id] = personMarker
  }

  renderState(people) {
    people.forEach(person => {
      this.addPersonToGame(person)
      person.houses.forEach(house => {
        this.addHouseToView(house.position);
      });
    })
  }

  loadServerBindings() {
    this.server.setBindings({
      [Server.SET_POSITION]:  this.onSetPersonPosition,
      [Server.ADD_PERSON]:    this.onAddPerson,
      [Server.ADD_HOUSE]:     this.onAddHouse,
      [Server.REQUEST_STATE]: this.setGame
    }, this);
  }

  loadGameState() {
    this.server.requestState();
  }

  load() {
    this.loadKeysBindings();
    this.loadServerBindings();
    this.loadGameState();
  }
}

export default Game;
