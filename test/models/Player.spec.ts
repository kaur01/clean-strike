import {expect} from 'chai';
import {suite, test} from 'mocha-typescript';
import {Player} from "../../src/models/Player";

@suite
class PlayerSpec {
    private player: Player;

    public before(): void {
        this.player = new Player();
    }

    @test
    public async shouldUpdateThePlayersScoreWithTheGivenValue(): Promise<void> {
        this.player.score = 2;
        const result = this.player.updateScore(2);
        expect(result).to.equal(4);
    }
}
