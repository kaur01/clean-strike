import {expect} from 'chai';
import {suite, test} from 'mocha-typescript';
import {Selection} from "../../src/models/Selection";
import {PlayerService} from "../../src/services/PlayerService";
import {Player} from "../../src/models/Player";
import {deepEqual, spy, verify} from "ts-mockito";

@suite
class PlayerServiceSpec {
    private service: PlayerService;


    public before(): void {
        this.service = new PlayerService();
    }

    @test
    public async shouldUpdateThePlayersScoreWithTheGivenValue(): Promise<void> {
        const player = new Player(2);

        this.service.updateScore(player, 2);

        expect(player.score).to.equal(4);
    }

    @test
    public async shouldReturnZeroIfThePlayersScoreIsInNegatives(): Promise<void> {
        const player = new Player(1);

        this.service.updateScore(player, -2);

        expect(player.score).to.equal(0);
    }

    @test
    public async shouldUpdateHistoryOfThePlayerWithTheGivenMove(): Promise<void> {
        const player = new Player(0, [])
        let move = {score: 1, selection: Selection.Strike};

        this.service.updateHistory(player, move);

        expect(player.gameHistory.length).to.equal(1);
        expect(player.gameHistory[0]).to.deep.equal(move);
    }

    @test
    public async shouldUpdateScoreWhenThreeConsecutiveEmptyStrikes(): Promise<void> {
        const spiedService = spy(this.service);
        const gameHistory = [{score: 0, selection: Selection.RedStrike},
            {score: 0, selection: Selection.None}, {score: 0, selection: Selection.None}, {
                score: 0,
                selection: Selection.None
            },
            {score: 0, selection: Selection.RedStrike}];
        const player = new Player(0, gameHistory);

        this.service.hasThreeConsecutiveEmptyStrikes(player);

        verify(spiedService.updateScore(player, -1)).once();
    }

    @test
    public async shouldNotUpdateScoreWhenNoThreeConsecutiveEmptyStrikes(): Promise<void> {
        const spiedService = spy(this.service);
        const gameHistory = [{score: 0, selection: Selection.RedStrike},
            {score: 0, selection: Selection.None}, {score: 0, selection: Selection.RedStrike},
            {score: 0, selection: Selection.None},
            {score: 0, selection: Selection.RedStrike}];
        const player = new Player(0, gameHistory);

        this.service.hasThreeConsecutiveEmptyStrikes(player);

        verify(spiedService.updateScore(player, -1)).never();
    }

    @test
    public async shouldUpdateScoreWhenThreeFouls(): Promise<void> {
        const spiedService = spy(this.service);
        const gameHistory = [{score: 0, selection: Selection.RedStrike},
            {score: 0, selection: Selection.StrikerStrike}, {score: 0, selection: Selection.RedStrike},
            {score: 0, selection: Selection.DefunctCoin},
            {score: 0, selection: Selection.StrikerStrike}];
        const player = new Player(0, gameHistory);

        this.service.hasThreeFouls(player);

        verify(spiedService.updateScore(player, -1)).once();
    }

    @test
    public async shouldNotUpdateScoreWhenNoThreeFouls(): Promise<void> {
        const spiedService = spy(this.service);
        const gameHistory = [{score: 0, selection: Selection.RedStrike},
            {score: 0, selection: Selection.None}, {score: 0, selection: Selection.RedStrike},
            {score: 0, selection: Selection.None},
            {score: 0, selection: Selection.RedStrike}];
        const player = new Player(0, gameHistory);

        this.service.hasThreeFouls(player);

        verify(spiedService.updateScore(player, -1)).never();
    }

    @test
    public async shouldReturnTrueIfPlayerHasMoreThanFivePoints(): Promise<void> {
        const player = new Player(8);

        const result = this.service.hasFiveOrMorePoints(player);

        expect(result).to.be.true;
    }

    @test
    public async shouldReturnFalseIfPlayerDoesNotHaveMoreThanFivePoints(): Promise<void> {
        const player = new Player(2);

        const result = this.service.hasFiveOrMorePoints(player);

        expect(result).to.be.false;
    }

    @test
    public async shouldReturnTrueIfDifferenceIsMoreThanThree(): Promise<void> {
        const playerOne = new Player(5);
        const playerTwo = new Player(2);

        const result = this.service.isDifferenceThreeOrMore(playerOne, playerTwo);

        expect(result).to.be.true;
    }

    @test
    public async shouldReturnFalseIfDifferenceIsNotMoreThanThree(): Promise<void> {
        const playerOne = new Player(4);
        const playerTwo = new Player(2);

        const result = this.service.isDifferenceThreeOrMore(playerOne, playerTwo);

        expect(result).to.be.false;
    }

    @test
    public async shouldReturnZeroIfNoDifference(): Promise<void> {
        const playerOne = new Player(2);
        const playerTwo = new Player(2);

        const result = this.service.isDifferenceThreeOrMore(playerOne, playerTwo);

        expect(result).to.equal(0);
    }

    @test
    public async shouldGetScoreForThePlayer(): Promise<void> {
        const player = new Player(8);

        const score = this.service.getScore(player);

        expect(score).to.equal(player.score);
    }

    @test
    public async shouldReturnTrueIfHighestScorerHasMoreThanFivePoints(): Promise<void> {
        const playerOne = new Player(5);
        const playerTwo = new Player(0, [{score: 0, selection: Selection.None}]);

        const result = this.service.highestScorerHasFiveOrMorePoints(playerOne, playerTwo);

        expect(result).to.be.true;
    }

    @test
    public async shouldReturnFalseIfHighestScorerDoesNotHaveMoreThanFivePoints(): Promise<void> {
        const playerOne = new Player(4);
        const playerTwo = new Player(0, [{score: 0, selection: Selection.None}]);

        const result = this.service.highestScorerHasFiveOrMorePoints(playerOne, playerTwo);

        expect(result).to.be.false;
    }
}
