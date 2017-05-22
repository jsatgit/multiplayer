/**
 * event to register user
 */
export const REGISTER_USER = 'register_user';

/**
 * event to receive game state after registering user
 */
export const GAME_STATE = 'game_state';

/**
 * event to move a person
 */
export const MOVE = 'move';

/**
 * event to add a house
 */
export const ADD_HOUSE = 'add_house';

/**
 * event to add a person
 */
export const ADD_PERSON = 'add_person';

/**
 * event to remove a person
 */
export const REMOVE_PERSON = 'remove_person';

/**
 * event to update a resource
 */
export const UPDATE_POSITION = 'update_position';

/**
 * direction up for the MOVE event
 */
export const UP = 'up';

/**
 * direction down for the MOVE event
 */
export const DOWN = 'down';

/**
 * direction right for the MOVE event
 */
export const RIGHT = 'right';

/**
 * direction left for the MOVE event
 */
export const LEFT = 'left';

/**
 * event for updating a resource
 */
export const RESOURCE = 'resource';

/**
 * event for trading
 */
export const TRADE = 'trade';

let server = null;

/**
 * Manages socket communication between client and server
 */
class Server {
  contructor() {
    this._socket = null;
  }

  emit(evt, data) {
    console.log(`[${evt}] => ${JSON.stringify(data)}`);
    if (data) {
      this._socket.emit(evt, data);
    } else {
      this._socket.emit(evt);
    }
  }

  /**
   * Makes a websocket connection to the server
   * @param {string} host - host ip address
   * @param {string} port - host port number
   */
  connect(host, port) {
    return new Promise((resolve, reject) => {
      const address = `http://${host}:${port}`;
      this._socket = io.connect(address);
      this._socket.on('connect', () => {
        resolve();
      });
    });
  }

  /**
   * Register listeners for server events
   * @param {object} mapping - mapping of event name to callback
   */
  addMapping(mapping) {
    for (let evt in mapping) {
      this._socket.on(evt, response => {
        mapping[evt](response);
      });
    }
  }

  /**
   * Registers a user
   * @param {Object} options
   * @param {string} options.name - name of the user
   * @param {string} options.host - ip address of the user
   * @param {boolean} options.isBot - whether the user is a bot
   */
  registerUser(options) {
    this.emit(REGISTER_USER, options);
  }

  /**
   * Moves a person
   * @param {Object} options
   * @param {Object} options.step - position to step to
   * @param {Object} options.direction - direction to move towards
   */
  move(options) {
    getServer().emit(MOVE, options);
  }

  /**
   * Adds a house
   */
  addHouse() {
    getServer().emit(ADD_HOUSE);
  }

  /**
   * Consumes a resource
   * @param {string} resourceName - name of the resource to take
   * @param {number} id - id of the resource to take
   */
  takeResource(resourceName, id) {
    getServer().emit(RESOURCE, {
      action: 'take',
      resource_name: resourceName,
      resource_id: id
    });
  }

  /**
   * Trades a resource
   * @param {number} id - id of the person to trade with 
   * @param {Object} items - mapping of object names to quantities
   */
  trade(to, items) {
    getServer().emit(TRADE, {
      to: to,
      items: items
    });
  }
}

/**
 * Obtain global server object
 */
export function getServer() {
  if (!server) {
    server = new Server();
  }
  return server;
}
