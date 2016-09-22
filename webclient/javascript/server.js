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
        console.log(evt);
        this.bindings[evt](response.position);
      });
    }
  }

  addPerson(position) {
    this.socket.emit(Server.ADD_PERSON, {
      position: position
    });
  }

  addHouse(position) {
    this.socket.emit(Server.ADD_HOUSE, {
      position: position
    });
  }

  setPosition(position) {
    this.socket.emit(Server.SET_POSITION, {
      position: position
    });
  }
}

export default Server;
