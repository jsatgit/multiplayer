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

  addHouse(personId, position) {
    this.socket.emit(Server.ADD_HOUSE, {
      personId: personId,
      position: position
    });
  }

  setPosition(personId, position) {
    this.socket.emit(Server.SET_POSITION, {
      personId: personId,
      position: position
    });
  }

  requestState() {
    this.socket.emit(Server.REQUEST_STATE);
  }
}

export default Server;
