import Server from './server';
import GameModel from './models/gameModel'
import GameView from './views/gameView'
import Houses from './models/houses'
import Person from './models/person'
import Keys from './keys'
import Pages from './pages'
import Form from './form'
import Map from './map'
import ClickMover from './controllers/clickMover'

/*
 * The game is the central object that communicates
 * between the view, server, and local gamestate
 */
class Game {
  start() {
    Pages.show(Form)
    const formPromise = Form.submit();
    const serverPromise = Server.connect('localhost', '5000');
    Promise.all([serverPromise, formPromise]).then(results => {
      const [serverResult, formResult] = results;
      Pages.show(Map);
      addServerMapping();
      Server.registerUser(formResult);
      addKeyMapping();
      ClickMover.enable();
    });
  }
}

function addServerMapping() {
  Server.addMapping({
    [Server.GAME_STATE]: gameState => {
      const gameView = new GameView();
      const gameModel = new GameModel();
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
  ClickMover.stop();
  Server.move({ direction: direction });
}

export default Game;
