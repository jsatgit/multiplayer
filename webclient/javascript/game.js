import Server from './server';
import GameModel from './models/gameModel'
import GameView from './views/gameView'
import Houses from './models/houses'
import Person from './models/person'
import Keys from './controllers/keys'
import Pages from './pages'
import Form from './form'
import Map from './map'
import Mover from './controllers/mover'

let isBot = false;

/*
 * The game is the central object that communicates
 * between the view, server, and local gamestate
 */
class Game {
  start() {
    Pages.show(Form)
    Form.submit().then(formResults => {
      const host = formResults.host || 'localhost';
      isBot = formResults.isBot;
      return [formResults, Server.connect(host, '5000')];
    }).then(results => {
      const [formResults, _] = results;
      Pages.show(Map);
      addServerMapping();
      Server.registerUser(formResults);
      if (!isBot) {
        addKeyMapping();
        Mover.listenToClicks();
      }
    });
  }
}

function addServerMapping() {
  Server.addMapping({
    [Server.GAME_STATE]: gameState => {
      const gameView = new GameView();
      const gameModel = new GameModel(isBot);
      gameView.subscribe(gameModel);
      gameModel.setState({
        myself: Person.unpack(gameState.myself),
        people: gameState.people,
        houses: gameState.houses,
        apiKey: gameState.apiKey
      });
    }
  });
}

function addKeyMapping() {
  Keys.addMapping({
    [Keys.UP]:     () => move(Server.UP),
    [Keys.DOWN]:   () => move(Server.DOWN),
    [Keys.RIGHT]:  () => move(Server.RIGHT),
    [Keys.LEFT]:   () => move(Server.LEFT),
    [Keys.SPACE]:  Server.addHouse
  });
}

function move(direction) {
  Mover.stop();
  Server.move({ direction: direction });
}

export default Game;
