import {expect} from 'chai';
import {suite, test} from 'mocha-typescript';
import {Board} from "../../src/models/Board";

@suite
class BoardSpec {
    private board: Board;

    public before(): void {
        this.board = new Board(9, 1);
    }

    @test
    public async shouldReduceTheNumberOfBlackCoinsOnStrikeOnlyIfBlackCoinsPresent(): Promise<void> {

        const result = this.board.strike();

        expect(result).to.equal(1);
        expect(this.board.blackCoins).to.equal(8);
    }

    @test
    public async shouldReturnZeroWhenNoBlackCoinsPresentForStrike(): Promise<void> {
        this.board.blackCoins = 0;

        const result = this.board.strike();

        expect(result).to.equal(0);
    }

    @test
    public async shouldReduceTheNumberOfBlackCoinsByTwo(): Promise<void> {
        this.board.blackCoins = 6;

        const result = this.board.multiStrike();

        expect(result).to.equal(2);
        expect(this.board.blackCoins).to.equal(4);
    }

    @test
    public async shouldReturnZeroWhenNoBlackCoinsPresentForMultiStrike(): Promise<void> {
        this.board.blackCoins = 0;

        const result = this.board.multiStrike();

        expect(result).to.equal(0);
    }

    @test
    public async shouldReduceTheNumberOfRedCoinToZeroWhenRedStrike(): Promise<void> {
        this.board.redCoins = 1;

        const result = this.board.redStrike();

        expect(result).to.equal(3);
        expect(this.board.redCoins).to.equal(0);

    }

    @test
    public async shouldReturnZeroWhenNoRedCoinsPresent(): Promise<void> {
        this.board.redCoins = 0;

        const result = this.board.redStrike();

        expect(result).to.equal(0);
    }

    @test
    public async shouldReturnNegativeOneWhenTheStrikerIsInThePocket(): Promise<void> {
        const result = this.board.strikerStrike();

        expect(result).to.equal(-1);
    }

    @test
    public async shouldReduceTheNumberOfBlackCoinWhenEncounteredADefunctCoin(): Promise<void> {
        const result = this.board.defunct();

        expect(result).to.equal(-2);
        expect(this.board.blackCoins).to.equal(8);
    }

    @test
    public async shouldReturnZeroWhenNoBlackCoinsPresentForDefunctStrike(): Promise<void> {
        this.board.blackCoins = 0;

        const result = this.board.defunct();

        expect(result).to.equal(0);
    }

    @test
    public async shouldReturnZeroWhenTheNoCoinsGoInThePocket(): Promise<void> {
        const result = this.board.emptyStrike();

        expect(result).to.equal(0);
    }
}

