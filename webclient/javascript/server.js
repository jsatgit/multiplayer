class Server {
  constructor(host, port) {
    this.host = host;
    this.port = port;
    this.socket = null;
    this.bindings = null;
  }

  static get SET_POSITION() { return 'setPosition'; }
  static get ADD_PERSON() { return 'addPerson'; }
  static get ADD_HOUSE() { return 'addHouse'; }
  static get REQUEST_STATE() { return 'requestState'; }
  static get REMOVE_PERSON() { return 'removePerson'; }

  connect() {
    return new Promise((resolve, reject) => {
      const address = `http://${this.host}:${this.port}`;
      this.socket = io.connect(address);
      this.socket.on('connect', () => {
        resolve();
      });
    });
  }

  setBindings(bindings, context) {
    this.bindings = bindings;
    for (let evt in this.bindings) {
      this.bindings[evt] = this.bindings[evt].bind(context);
      this.socket.on(evt, response => {
        this.bindings[evt](response);
      });
    }
  }

  addHouse(house) {
    this.socket.emit(Server.ADD_HOUSE, house.serialize());
  }

  setPosition(personId, position) {
    this.socket.emit(Server.SET_POSITION, {
      personId: personId,
      position: position
    });
  }

  requestState(formResult) {
    this.socket.emit(Server.REQUEST_STATE, formResult);
  }
}

export default Server;