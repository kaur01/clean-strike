import {Game} from "./handler/Game";
import {PlayerService} from "./services/PlayerService";
import {BoardService} from "./services/BoardService";

console.log("Ready to play?");

const game = new Game(new BoardService(), new PlayerService());
game.start();
