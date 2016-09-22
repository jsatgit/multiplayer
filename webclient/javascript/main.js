import 'babel-polyfill';
import Server from './server.js';
import Map from './map.js';
import Game from './game.js';

const map = new Map();
const mapPromise = map.load();
const server = new Server('localhost', '5000');
const serverPromise = server.connect(); 


const game = new Game(map, server);
Promise.all([mapPromise, serverPromise]).then(results => {
  game.load();
});
