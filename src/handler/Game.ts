import {Board} from "../models/Board";
import {Player} from "../models/Player";
import {Selection} from "../models/Selection";
import {BoardService} from "../services/BoardService";
import {PlayerService} from "../services/PlayerService";

export class Game {
    board: Board = new Board();
    playerOne: Player = new Player();
    playerTwo: Player = new Player();
    private boardService: BoardService;
    private playerService: PlayerService;
    private currentPlayer: Player = this.playerOne;

    constructor(boardService: BoardService, playerService: PlayerService) {
        this.boardService = boardService;
        this.playerService = playerService;
    }

    private _option: number;

    set option(value: number) {
        this._option = value;
    }

    public start() {
        console.log("Player ", ": Choose an outcome from the list below");
        console.log("1. Strike");
        console.log("2. Multi Strike");
        console.log("3. Red strike");
        console.log("4. Striker strike");
        console.log("5. Defunct coin");
        console.log("6. None");

        while (true) {
            if (!this.boardService.hasCoins(this.board)) {
                if (this.playerService.isDifferenceThreeOrMore(this.playerOne, this.playerTwo)) {
                    if (this.playerService.hasFiveOrMorePoints(this.playerOne)) {
                        console.log('Player one');
                        break;
                    } else if (this.playerService.hasFiveOrMorePoints(this.playerTwo)) {
                        console.log('Player two');
                        break;
                    } else {
                        console.log('draw');
                        break;
                    }
                } else {
                    console.log('draw');
                    break;
                }
            } else {
                this.onSelection(this.currentPlayer);
            }

        }
    }

    onSelection(currentPlayer) {
        if (this._option === 1) {
            const currentScore = this.boardService.strike(this.board);
            this.updatePlayer(currentPlayer, currentScore, Selection.Strike);
        } else if (this._option === 2) {
            const currentScore = this.boardService.multiStrike(this.board);
            this.updatePlayer(currentPlayer, currentScore, Selection.MultiStrike);
        } else if (this._option === 3) {
            const currentScore = this.boardService.redStrike(this.board);
            this.updatePlayer(currentPlayer, currentScore, Selection.RedStrike);
        } else if (this._option === 4) {
            const currentScore = this.boardService.strikerStrike();
            this.updatePlayer(currentPlayer, currentScore, Selection.StrikerStrike);
            this.playerService.hasThreeFouls(currentPlayer);
        } else if (this._option === 5) {
            const currentScore = this.boardService.defunct(this.board);
            this.updatePlayer(currentPlayer, currentScore, Selection.DefunctCoin);
            this.playerService.hasThreeFouls(currentPlayer);
        } else if (this._option === 6) {
            const currentScore = this.boardService.emptyStrike();
            this.updatePlayer(currentPlayer, currentScore, Selection.None);
            this.playerService.hasThreeConsecutiveEmptyStrikes(currentPlayer);
        } else {
            console.log('Option not found. Choose again');
            this.start();
        }
        this.currentPlayer = this.playerOne ? this.playerTwo : this.playerOne;
    }

    private updatePlayer(currentPlayer: Player, currentScore, selection: Selection) {
        this.playerService.updateScore(currentPlayer, currentScore);
        this.playerService.updateHistory(currentPlayer, {score: currentScore, selection: selection});
    }

}
