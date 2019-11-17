import {expect} from 'chai';
import {suite, test} from 'mocha-typescript';
import {CleanStrikeBoard} from "../src/CleanStrikeBoard";

@suite
class CleanStrikeBoardSpec {
    private cleanStrikeBoard: CleanStrikeBoard;

    public before(): void {
        this.cleanStrikeBoard = new CleanStrikeBoard(9,1);
    }

    @test
    public async shouldReduceTheNumberOfBlackCoinsOnStrikeOnlyIfBlackCoinsPresent(): Promise<void> {

        const result = this.cleanStrikeBoard.strike();

        expect(result).to.equal(1);
        expect(this.cleanStrikeBoard.blackCoins).to.equal(8);
    }

    @test
    public async shouldReturnZeroWhenNoBlackCoinsPresentForStrike(): Promise<void> {
        this.cleanStrikeBoard.blackCoins = 0;

        const result = this.cleanStrikeBoard.strike();

        expect(result).to.equal(0);
    }

}

