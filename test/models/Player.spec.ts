import {suite, test} from 'mocha-typescript';
import {Selection} from "../../src/models/Selection";
import {Player} from "../../src/models/Player";
import {expect} from 'chai';

@suite
class PlayerSpec {
    private player: Player;

    before() {
        this.player = new Player(1,0,[],'name');
    }

    @test
    public async shouldReturnTrueIfStrikeIsEmpty(): Promise<void> {
        const result = this.player.isEmptyStrike({score: 0, selection: Selection.None});

        expect(result).to.be.true;
    }

    @test
    public async shouldReturnFalseIfStrikeIsNotEmpty(): Promise<void> {
        const result = this.player.isEmptyStrike({score: 0, selection: Selection.DefunctCoin});

        expect(result).to.be.false;
    }

    @test
    public async shouldReturnTrueIfStrikeIsStriker(): Promise<void> {
        const result = this.player.isStrikerStrike({score: 0, selection: Selection.StrikerStrike});

        expect(result).to.be.true;
    }

    @test
    public async shouldReturnFalseIfStrikeIsNotStriker(): Promise<void> {
        const result = this.player.isStrikerStrike({score: 0, selection: Selection.DefunctCoin});

        expect(result).to.be.false;
    }

    @test
    public async shouldReturnTrueIfCoinIsDefunct(): Promise<void> {
        const result = this.player.isDefunct({score: 0, selection: Selection.DefunctCoin});

        expect(result).to.be.true;
    }

    @test
    public async shouldReturnFalseIfCoinIsDefunct(): Promise<void> {
        const result = this.player.isDefunct({score: 0, selection: Selection.None});

        expect(result).to.be.false;
    }

    @test
    public async shouldReturnTrueIfScoreGreaterThanFive(): Promise<void> {
        const result = this.player.isGreaterThanOrEqualToFive(6);

        expect(result).to.be.true;
    }

    @test
    public async shouldReturnFalseIfScoreGreaterThanFive(): Promise<void> {
        const result = this.player.isGreaterThanOrEqualToFive(0);

        expect(result).to.be.false;
    }

    @test
    public async shouldReturnUpdatedPlayerScoreIfIsPositive(): Promise<void> {
        const player = new Player(1,1,[],'');

        this.player.updateScore(3);

        expect(player.getScore()).to.equal(4);
    }

    @test
    public async shouldReturnZeroIfUpdatedPlayerScoreIsNegative(): Promise<void> {
        const player = new Player(1,-2,[],'');

        this.player.updateScore( 1);

        expect(player.getScore()).to.equal(0);
    }

    @test
    public async shouldUpdatePlayerHistory(): Promise<void> {
        let player = new Player(1,0,[],'');

        this.player.updateHistory({score: 0, selection: Selection.RedStrike});

        expect(player.getGameHistory()).to.be.of.length(1);
    }

}
