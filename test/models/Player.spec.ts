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
}
