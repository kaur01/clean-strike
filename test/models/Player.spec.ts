import {expect} from 'chai';
import {suite, test} from 'mocha-typescript';
import {Player} from "../../src/models/Player";
import {Selection} from "../../src/models/Selection";

@suite
class PlayerSpec {
    private player: Player;

    public before(): void {
        this.player = new Player();
    }

    @test
    public async shouldUpdateThePlayersScoreWithTheGivenValue(): Promise<void> {
        this.player.score = 2;
        this.player.updateScore(2);
        expect(this.player.score).to.equal(4);
    }

    @test
    public async shouldReturnZeroIfThePlayersScoreIsInNegatives(): Promise<void> {
        this.player.score = 1;
        this.player.updateScore(-2);
        expect(this.player.score).to.equal(0);
    }

    @test
    public async shouldUpdateHistoryOfThePlayerWithTheGivenMove(): Promise<void> {
        let move = {score: 1, selection: Selection.Strike};
        this.player.gameHistory = [];

        this.player.updateHistory(move);

        expect(this.player.gameHistory.length).to.equal(1);
        expect(this.player.gameHistory[0]).to.deep.equal(move);
    }
}
