let _socket;

class Server {
  static get REGISTER_USER() { return 'register_user'; }
  static get GAME_STATE() { return 'game_state'; }
  static get MOVE() { return 'move'; }
  static get ADD_HOUSE() { return  'add_house'; }
  static get ADD_PERSON() { return  'add_person'; }
  static get REMOVE_PERSON() { return  'remove_person'; }
  static get UPDATE_POSITION() { return  'update_position'; }
  static get UP() { return  'up'; }
  static get DOWN() { return  'down'; }
  static get RIGHT() { return  'right'; }
  static get LEFT() { return  'left'; }

  static connect(host, port) {
    return new Promise((resolve, reject) => {
      const address = `http://${host}:${port}`;
      _socket = io.connect(address);
      _socket.on('connect', () => {
        resolve();
      });
    });
  }

  static addMapping(mapping) {
    for (let evt in mapping) {
      _socket.on(evt, response => {
        mapping[evt](response);
      });
    }
  }

  static registerUser(formResult) {
    _socket.emit(Server.REGISTER_USER, formResult);
  }

  static move(direction) {
    _socket.emit(Server.MOVE, direction);
  }

  static addHouse() {
    _socket.emit(Server.ADD_HOUSE);
  }

}

export default Server;
