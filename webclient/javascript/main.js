require("../css/main.css");

import 'babel-polyfill';

import Game from './game';

const game = new Game();
game.start();



/*
import Server from './server.js';
import Game from './game.js';
import Form from './form.js';

const server = new Server('localhost', '5000');
const serverPromise = server.connect(); 

const game = new Game(server);

Promise.all([serverPromise, formPromise]).then(results => {
  const [serverResult, formResult] = results;
  form.hide();
  game.show();
  game.load(formResult);
});
*/
