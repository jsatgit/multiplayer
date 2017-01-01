import {
  getServer,
  GAME_STATE,
  UP as SERVER_UP,
  DOWN as SERVER_DOWN,
  RIGHT as SERVER_RIGHT,
  LEFT as SERVER_LEFT,
} from './server';
import GameModel from './models/gameModel';
import GameView from './views/gameView';
import Person from './models/person';
import Keys from './controllers/keys';
import Pages from './pages';
import {getForm} from './form';
import {getMap} from './map';
import Mover from './controllers/mover';

let isBot = false;

/*
 * The game is the central object that communicates
 * between the view, server, and local gamestate
 */
class Game {
  start() {
    const server = getServer();
    const form = getForm();
    Pages.show(form);
    form.submit().then(formResults => {
      const host = formResults.host || 'localhost';
      isBot = formResults.isBot;
      return [formResults, server.connect(host, '5000')];
    }).then(results => {
      const [formResults, _] = results;
      Pages.show(getMap());
      addServerMapping();
      server.registerUser(formResults);
      if (!isBot) {
        addKeyMapping();
        Mover.listenToClicks();
      }
    });
  }
}

function addServerMapping() {
  getServer().addMapping({
    [GAME_STATE]: gameState => {
      const gameView = new GameView();
      const gameModel = new GameModel(isBot);
      gameView.subscribe(gameModel);
      gameModel.setState({
        myself: Person.unpack(gameState.myself),
        people: gameState.people,
        houses: gameState.houses,
        resources: gameState.resources,
        apiKey: gameState.apiKey
      });
    }
  });
}

function addKeyMapping() {
  Keys.addMapping({
    [Keys.UP]:     () => move(SERVER_UP),
    [Keys.DOWN]:   () => move(SERVER_DOWN),
    [Keys.RIGHT]:  () => move(SERVER_RIGHT),
    [Keys.LEFT]:   () => move(SERVER_LEFT),
    [Keys.SPACE]:  getServer().addHouse 
  });
}

function move(direction) {
  Mover.stop();
  getServer().move({ direction: direction });
}

export default Game;
