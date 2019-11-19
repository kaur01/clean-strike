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
        expect(this.board.blackCoins).to.equal(8);
    }

    @test
    public async shouldReturnZeroWhenNoBlackCoinsPresentForStrike(): Promise<void> {
        this.board.blackCoins = 0;

        const result = this.boardService.strike(this.board);

        expect(result).to.equal(0);
    }

    @test
    public async shouldReduceTheNumberOfBlackCoinsByTwo(): Promise<void> {
        this.board.blackCoins = 6;

        const result = this.boardService.multiStrike(this.board);

        expect(result).to.equal(2);
        expect(this.board.blackCoins).to.equal(4);
    }

    @test
    public async shouldReturnZeroWhenNoBlackCoinsPresentForMultiStrike(): Promise<void> {
        this.board.blackCoins = 0;

        const result = this.boardService.multiStrike(this.board);

        expect(result).to.equal(0);
    }

    @test
    public async shouldReduceTheNumberOfRedCoinToZeroWhenRedStrike(): Promise<void> {
        this.board.redCoins = 1;

        const result = this.boardService.redStrike(this.board);

        expect(result).to.equal(3);
        expect(this.board.redCoins).to.equal(0);

    }

    @test
    public async shouldReturnZeroWhenNoRedCoinsPresent(): Promise<void> {
        this.board.redCoins = 0;

        const result = this.boardService.redStrike(this.board);

        expect(result).to.equal(0);
    }

    @test
    public async shouldReturnNegativeOneWhenTheStrikerIsInThePocket(): Promise<void> {
        const result = this.boardService.strikerStrike();

        expect(result).to.equal(-1);
    }

    @test
    public async shouldReduceTheNumberOfBlackCoinWhenEncounteredADefunctCoin(): Promise<void> {
        this.board.blackCoins = 9;

        const result = this.boardService.defunct(this.board);

        expect(result).to.equal(-2);
        expect(this.board.blackCoins).to.equal(8);
    }

    @test
    public async shouldReturnZeroWhenNoBlackCoinsPresentForDefunctStrike(): Promise<void> {
        this.board.blackCoins = 0;

        const result = this.boardService.defunct(this.board);

        expect(result).to.equal(0);
    }

    @test
    public async shouldReturnZeroWhenTheNoCoinsGoInThePocket(): Promise<void> {
        const result = this.boardService.emptyStrike();

        expect(result).to.equal(0);
    }
}


