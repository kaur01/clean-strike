import {expect} from 'chai';
import {suite, test} from 'mocha-typescript';
import {BoardService} from "../../src/services/BoardService";
import {Board} from "../../src/models/Board";

@suite
class BoardServiceSpec {
    private boardService: BoardService;

    public before(): void {
        this.boardService = new BoardService();
    }

    @test
    public async shouldReduceTheNumberOfBlackCoinsOnStrikeOnlyIfBlackCoinsPresent(): Promise<void> {
        const board  = new Board();

        const result = this.boardService.strike(board);

        expect(result).to.equal(1);
        expect(board.blackCoins).to.equal(8);
    }

    @test
    public async shouldReturnZeroWhenNoBlackCoinsPresentForStrike(): Promise<void> {
        const board  = new Board();
        board.blackCoins = 0;

        const result = this.boardService.strike(board);

        expect(result).to.equal(0);
    }

    @test
    public async shouldReduceTheNumberOfBlackCoinsByTwo(): Promise<void> {
        const board  = new Board();
        board.blackCoins = 6;

        const result = this.boardService.multiStrike(board);

        expect(result).to.equal(2);
        expect(board.blackCoins).to.equal(4);
    }

    @test
    public async shouldReturnZeroWhenNoBlackCoinsPresentForMultiStrike(): Promise<void> {
        const board  = new Board();
        board.blackCoins = 0;

        const result = this.boardService.multiStrike(board);

        expect(result).to.equal(0);
    }

    @test
    public async shouldReduceTheNumberOfRedCoinToZeroWhenRedStrike(): Promise<void> {
        const board  = new Board();
        board.redCoins = 1;

        const result = this.boardService.redStrike(board);

        expect(result).to.equal(3);
        expect(board.redCoins).to.equal(0);

    }

    @test
    public async shouldReturnZeroWhenNoRedCoinsPresent(): Promise<void> {
        const board  = new Board();
        board.redCoins = 0;

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
        const board  = new Board();
        board.blackCoins = 9;

        const result = this.boardService.defunct(board);

        expect(result).to.equal(-2);
        expect(board.blackCoins).to.equal(8);
    }

    @test
    public async shouldReturnZeroWhenNoBlackCoinsPresentForDefunctStrike(): Promise<void> {
        const board  = new Board();
        board.blackCoins = 0;

        const result = this.boardService.defunct(board);

        expect(result).to.equal(0);
    }

    @test
    public async shouldReturnZeroWhenTheNoCoinsGoInThePocket(): Promise<void> {
        const result = this.boardService.emptyStrike();

        expect(result).to.equal(0);
    }
}


