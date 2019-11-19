import {suite, test} from 'mocha-typescript';
import {Selection} from "../../src/models/Selection";
import {Player} from "../../src/models/Player";
import {expect} from 'chai';

@suite
class PlayerSpec {
    private player: Player;

    before() {
        this.player = new Player();
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
    public async shouldReturnUpdatedPlayerScoreIfIsPositive(): Promise<void> {
        const player = new Player(1);

        this.player.updateScore(player, 3);

        expect(player.score).to.equal(4);
    }

    @test
    public async shouldReturnZeroIfUpdatedPlayerScoreIsNegative(): Promise<void> {
        const player = new Player(-2);

        this.player.updateScore(player, 1);

        expect(player.score).to.equal(0);
    }

}
