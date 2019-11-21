import {expect} from 'chai';
import {suite, test} from 'mocha-typescript';
import {BoardService} from "../../src/services/BoardService";
import {Board} from "../../src/models/Board";

@suite
class BoardServiceSpec {
    private board: Board;
    private boardService: BoardService;

    public before(): void {
        this.boardService = new BoardService();
        this.board = new Board();
    }

    @test
    public async shouldReduceTheNumberOfBlackCoinsOnStrikeOnlyIfBlackCoinsPresent(): Promise<void> {
        const result = this.boardService.strike(this.board);

        expect(result).to.equal(1);
        expect(this.board.getBlackCoins()).to.equal(8);
    }

    @test
    public async shouldReturnZeroWhenNoBlackCoinsPresentForStrike(): Promise<void> {
        const board = new Board(0);

        const result = this.boardService.strike(board);

        expect(result).to.equal(0);
    }

    @test
    public async shouldReduceTheNumberOfBlackCoinsByTwo(): Promise<void> {
        const board = new Board(6,0);

        const result = this.boardService.multiStrike(board);

        expect(result).to.equal(2);
        expect(this.board.getBlackCoins()).to.equal(4);
    }

    @test
    public async shouldReturnZeroWhenNoBlackCoinsPresentForMultiStrike(): Promise<void> {
        const board = new Board(0);

        const result = this.boardService.multiStrike(board);

        expect(result).to.equal(0);
    }

    @test
    public async shouldReduceTheNumberOfRedCoinToZeroWhenRedStrike(): Promise<void> {
       const board = new Board(0,1);

        const result = this.boardService.redStrike(board);

        expect(result).to.equal(3);
        expect(this.board.getRedCoins()).to.equal(0);

    }

    @test
    public async shouldReturnZeroWhenNoRedCoinsPresent(): Promise<void> {
       const board = new Board(0,0);

        const result = this.boardService.redStrike(board);

        expect(result).to.equal(0);
    }

    @test
    public async shouldReturnNegativeOneWhenTheStrikerIsInThePocket(): Promise<void> {
        const result = this.boardService.strikerStrike();

        expect(result).to.equal(-1);
    }

    @test
    public async shouldReduceTheNumberOfBlackCoinWhenEncounteredADefunctCoin(): Promise<void> {
        const board = new Board(9);

        const result = this.boardService.defunct(board);

        expect(result).to.equal(-2);
        expect(this.board.getBlackCoins()).to.equal(8);
    }

    @test
    public async shouldReturnZeroWhenNoBlackCoinsPresentForDefunctStrike(): Promise<void> {
        const board = new Board(0);

        const result = this.boardService.defunct(board);

        expect(result).to.equal(0);
    }

    @test
    public async shouldReturnZeroWhenTheNoCoinsGoInThePocket(): Promise<void> {
        const result = this.boardService.emptyStrike();

        expect(result).to.equal(0);
    }

    @test
    public async shouldReturnTrueIfHasCoins(): Promise<void> {
        const result = this.boardService.hasCoins(this.board);

        expect(result).to.be.true;
    }

    @test
    public async shouldReturnFalseIfHasCoins(): Promise<void> {
        const board = new Board(0,0);

        const result = this.boardService.hasCoins(board);

        expect(result).to.be.false;
    }
}


