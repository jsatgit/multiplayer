import Keys from './keys';
import Server from './server';

const COQUITLAM = {lat: 49.2838, lng: -122.7932};
const PERSON_ICON = 'https://www.apec-econ.ca/system/style/images/icon-small-person.png'
const HOUSE_ICON = 'http://findicons.com/files/icons/1672/mono/32/home.png'


class Game {
  constructor(map, server) {
    this.map = map;
    this.server = server;
    this.currentPosition = COQUITLAM;
    this.INCREMENT = 0.00001;
    this.person = null;
  }

  addPersonToView(position) {
    return this.map.addMarker(position, PERSON_ICON);
  }

  addPerson(position) {
    this.server.addPerson(position);
    return this.addPersonToView(position);
  }

  loadPerson() {
    this.person = this.addPerson(this.currentPosition);
  }

  setPersonPositionToView(position) {
    this.person.setPosition(position);
  }

  moveTo(dest) {
    this.currentPosition = dest;
    this.server.setPosition(dest);
    this.setPersonPositionToView(dest);
  }

  moveUp() {
    this.moveTo({
      lat: this.currentPosition.lat + this.INCREMENT,
      lng: this.currentPosition.lng
    });
  }

  moveDown() {
    this.moveTo({
      lat: this.currentPosition.lat - this.INCREMENT,
      lng: this.currentPosition.lng
    });
  }

  moveRight() {
    this.moveTo({
      lat: this.currentPosition.lat,
      lng: this.currentPosition.lng + this.INCREMENT
    });
  }

  moveLeft() {
    this.moveTo({
      lat: this.currentPosition.lat,
      lng: this.currentPosition.lng - this.INCREMENT
    });
  }

  addHouseToView(position) {
    return this.map.addMarker(position, HOUSE_ICON);
  }

  buildHouse() {
    this.server.addHouse(this.currentPosition);
    return this.addHouseToView(this.currentPosition);
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

  loadServerBindings() {
    this.server.setBindings({
      [Server.SET_POSITION]:  this.setPersonPositionToView,
      [Server.ADD_PERSON]:    this.addPersonToView,
      [Server.ADD_HOUSE]:     this.addHouseToView
    }, this);
  }

  load() {
    this.loadPerson();
    this.loadKeysBindings();
    this.loadServerBindings();
  }
}

export default Game;
