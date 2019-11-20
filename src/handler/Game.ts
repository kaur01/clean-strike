import {Board} from "../models/Board";
import {Player} from "../models/Player";
import {Selection} from "../models/Selection";
import {BoardService} from "../services/BoardService";
import {PlayerService} from "../services/PlayerService";

export class Game {
    message: string;
    board: Board = new Board();
    playerOne: Player = new Player();
    playerTwo: Player = new Player();
    currentPlayer: Player = this.playerOne;
    private boardService: BoardService;
    private playerService: PlayerService;

    constructor(boardService: BoardService, playerService: PlayerService) {
        this.boardService = boardService;
        this.playerService = playerService;
    }

    private _option: number;

    get option(): number {
        return this._option;
    }

    set option(value: number) {
        this._option = value;
    }

    public start() {

        while (true) {
            if (!this.boardService.hasCoins(this.board)) {
                if (!(this.playerService.isDifferenceThreeOrMore(this.playerOne, this.playerTwo) && this.playerService.highestScorerHasFiveOrMorePoints(this.playerOne, this.playerTwo))) {
                    this.message = 'Draw';
                    break;
                }else if(this.playerService.isDifferenceThreeOrMore(this.playerOne, this.playerTwo) && this.playerService.highestScorerHasFiveOrMorePoints(this.playerOne, this.playerTwo)){
                    this.message = 'Win';
                    break;
                }
            } else {
                console.log("Player ", ": Choose an outcome from the list below");
                console.log("1. Strike");
                console.log("2. Multi Strike");
                console.log("3. Red strike");
                console.log("4. Striker strike");
                console.log("5. Defunct coin");
                console.log("6. None");
                if(this._option >= 1 && this._option <= 6){
                    this.onSelection(this.currentPlayer);
                }else{
                    this.message = 'Please enter a value between 1 and 6';
                    break;
                }
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
        }
        this.currentPlayer = this.playerOne ? this.playerTwo : this.playerOne;
    }

    private updatePlayer(currentPlayer: Player, currentScore, selection: Selection) {
        this.playerService.updateScore(currentPlayer, currentScore);
        this.playerService.updateHistory(currentPlayer, {score: currentScore, selection: selection});
    }
}

