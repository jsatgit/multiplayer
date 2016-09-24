require("../css/main.css");

import 'babel-polyfill';
import Server from './server.js';
import Game from './game.js';

const server = new Server('localhost', '5000');
const serverPromise = server.connect(); 

const game = new Game(server);

serverPromise.then(results => {
  game.load();
});
