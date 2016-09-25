require("../css/main.css");

import 'babel-polyfill';
import Server from './server.js';
import Game from './game.js';
import Form from './form.js';

const server = new Server('localhost', '5000');
const serverPromise = server.connect(); 

const game = new Game(server);

const form = new Form();
const formPromise = form.submit();

Promise.all([serverPromise, formPromise]).then(results => {
  const [serverResult, formResult] = results;
  form.hide();
  game.show();
  game.load(formResult);
});
