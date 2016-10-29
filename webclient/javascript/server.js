let _socket;

class Server {
  static get REGISTER_USER() { return 'register_user'; }
  static get GAME_STATE() { return 'game_state'; }
  static get MOVE_UP() { return 'move_up'; }
  static get MOVE_DOWN() { return  'move_down'; }
  static get MOVE_RIGHT() { return  'move_right'; }
  static get MOVE_LEFT() { return  'move_left'; }
  static get ADD_HOUSE() { return  'add_house'; }
  static get ADD_PERSON() { return  'add_person'; }
  static get REMOVE_PERSON() { return  'remove_person'; }
  static get UPDATE_POSITION() { return  'update_position'; }

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

  static moveUp() {
    _socket.emit(Server.MOVE_UP);
  }

  static moveDown() {
    _socket.emit(Server.MOVE_DOWN);
  }

  static moveRight() {
    _socket.emit(Server.MOVE_RIGHT);
  }

  static moveLeft() {
    _socket.emit(Server.MOVE_LEFT);
  }

  static addHouse() {
    _socket.emit(Server.ADD_HOUSE);
  }

}

export default Server;
