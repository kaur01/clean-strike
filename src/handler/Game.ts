import {Board} from "../models/Board";
import {Player} from "../models/Player";
import {Selection} from "../models/Selection";
import {BoardService} from "../services/BoardService";
import {PlayerService} from "../services/PlayerService";

export class Game {
    message: string;
    option: number;
    selectedOptions: number[] = [];

    board: Board = new Board();
    playerOne: Player = new Player(1,0, [], 'playerOne');
    playerTwo: Player = new Player(2,0, [], 'playerTwo');
    currentPlayer: Player = this.playerOne;

    private boardService: BoardService;
    private playerService: PlayerService;

    constructor(boardService: BoardService, playerService: PlayerService) {
        this.boardService = boardService;
        this.playerService = playerService;
    }

    public start() {
       let i=0;
        //Add to selectedOptions for an input of options. Must be commented for the tests to pass.
        // this.selectedOptions = [1];
            while (true) {
                if (!this.boardService.hasCoins(this.board)) {
                    if (!(this.playerService.isDifferenceThreeOrMore(this.playerOne, this.playerTwo) && this.playerService.highestScorerHasFiveOrMorePoints(this.playerOne, this.playerTwo))) {
                        this.message = 'Draw';
                        console.log(this.message);
                        break;
                    } else if (this.playerService.isDifferenceThreeOrMore(this.playerOne, this.playerTwo) && this.playerService.highestScorerHasFiveOrMorePoints(this.playerOne, this.playerTwo)) {
                        this.message = 'Win';
                        const highestScorer = this.playerService.hasHighestScorer(this.playerOne,this.playerTwo);
                        console.log(this.message + highestScorer.getName());
                        break;
                    }
                } else {
                    this.displayOptions();
                    this.option = this.selectedOptions.length > 0 ? this.selectedOptions[i] : undefined;
                    if(this.option === undefined){
                        break;
                    }
                    this.isValidSelectedOption();
                }
                i++;
            }
    }


    private isValidSelectedOption() {
        if (this.option >= 1 && this.option <= 6) {
            this.onSelection(this.currentPlayer);
        } else {
            this.message = 'Please enter a value between 1 and 6';
            console.log(this.message);
        }
    }

    private displayOptions() {
        console.log(`Player: ${this.getName()} Choose an outcome from the list below`);
        console.log("1. Strike");
        console.log("2. Multi Strike");
        console.log("3. Red strike");
        console.log("4. Striker strike");
        console.log("5. Defunct coin");
        console.log("6. None");
    }

    private getName() {
        return this.playerService.getName(this.currentPlayer);
    }

    private onSelection(currentPlayer) {
        if (this.option === 1) {
            const currentScore = this.boardService.strike(this.board);
            this.updatePlayer(currentPlayer, currentScore, Selection.Strike);
        } else if (this.option === 2) {
            const currentScore = this.boardService.multiStrike(this.board);
            this.updatePlayer(currentPlayer, currentScore, Selection.MultiStrike);
        } else if (this.option === 3) {
            const currentScore = this.boardService.redStrike(this.board);
            this.updatePlayer(currentPlayer, currentScore, Selection.RedStrike);
        } else if (this.option === 4) {
            const currentScore = this.boardService.strikerStrike();
            this.updatePlayer(currentPlayer, currentScore, Selection.StrikerStrike);
            this.playerService.hasThreeFouls(currentPlayer);
        } else if (this.option === 5) {
            const currentScore = this.boardService.defunct(this.board);
            this.updatePlayer(currentPlayer, currentScore, Selection.DefunctCoin);
            this.playerService.hasThreeFouls(currentPlayer);
        } else if (this.option === 6) {
            const currentScore = this.boardService.emptyStrike();
            this.updatePlayer(currentPlayer, currentScore, Selection.None);
            this.playerService.hasThreeConsecutiveEmptyStrikes(currentPlayer);
        }
        this.currentPlayer = this.currentPlayer === this.playerOne ? this.playerTwo : this.playerOne;
    }

    private updatePlayer(currentPlayer: Player, currentScore, selection: Selection) {
         this.playerService.updateScore(currentPlayer, currentScore);
         this.playerService.updateHistory(currentPlayer, {score: currentScore, selection: selection});
    }
}

