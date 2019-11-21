import {expect} from 'chai';
import {spy, verify} from "ts-mockito";
import {suite, test} from 'mocha-typescript';
import {Player} from "../../src/models/Player";
import {Selection} from "../../src/models/Selection";
import {PlayerService} from "../../src/services/PlayerService";

@suite
class PlayerServiceSpec {
    private service: PlayerService;


    public before(): void {
        this.service = new PlayerService();
    }

    @test
    public async shouldUpdateThePlayersScoreWithTheGivenValue(): Promise<void> {
        const player = new Player(1,2,[],'name');

        this.service.updateScore(player, 2);

        expect(player.getScore()).to.equal(4);
    }

    @test
    public async shouldReturnZeroIfThePlayersScoreIsInNegatives(): Promise<void> {
        const player = new Player(1,1,[],'name');

        this.service.updateScore(player, -2);

        expect(player.getScore()).to.equal(0);
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
        const player = new Player(1,0, gameHistory,'name');

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
        const player = new Player(1,0, gameHistory,'name');

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
        const player = new Player(1,0,[],'name');

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
        const player = new Player(1,0,[],'name');

        this.service.hasThreeFouls(player);

        verify(spiedService.updateScore(player, -1)).never();
    }

    @test
    public async shouldReturnTrueIfPlayerHasMoreThanFivePoints(): Promise<void> {
        const player = new Player(1,8,[],'name');

        const result = this.service.hasFiveOrMorePoints(player);

        expect(result).to.be.true;
    }

    @test
    public async shouldReturnFalseIfPlayerDoesNotHaveMoreThanFivePoints(): Promise<void> {
        const player = new Player(1,2,[],'name');

        const result = this.service.hasFiveOrMorePoints(player);

        expect(result).to.be.false;
    }

    @test
    public async shouldReturnTrueIfDifferenceIsMoreThanThree(): Promise<void> {
        const playerOne = new Player(1,5,[],'name');
        const playerTwo = new Player(1,2,[],'name');

        const result = this.service.isDifferenceThreeOrMore(playerOne, playerTwo);

        expect(result).to.be.true;
    }

    @test
    public async shouldReturnFalseIfDifferenceIsNotMoreThanThree(): Promise<void> {
        const playerOne = new Player(1,4,[],'name');
        const playerTwo = new Player(1,2,[],'name');

        const result = this.service.isDifferenceThreeOrMore(playerOne, playerTwo);

        expect(result).to.be.false;
    }

    @test
    public async shouldReturnZeroIfNoDifference(): Promise<void> {
        const playerOne = new Player(1,2,[],'name');
        const playerTwo = new Player(1,2,[],'name');

        const result = this.service.isDifferenceThreeOrMore(playerOne, playerTwo);

        expect(result).to.equal(0);
    }

    @test
    public async shouldGetScoreForThePlayer(): Promise<void> {
        const player = new Player(1,8,[],'name');

        const score = this.service.getScore(player);

        expect(score).to.equal(player.getScore());
    }

    @test
    public async shouldReturnTrueIfHighestScorerHasMoreThanFivePoints(): Promise<void> {
        const playerOne = new Player(1,5,[],'name');
        const playerTwo = new Player(1,0, [{score: 0, selection: Selection.None}],'name');

        const result = this.service.highestScorerHasFiveOrMorePoints(playerOne, playerTwo);

        expect(result).to.be.true;
    }

    @test
    public async shouldReturnFalseIfHighestScorerDoesNotHaveMoreThanFivePoints(): Promise<void> {
        const playerOne = new Player(1,4,[],'name');
        const playerTwo = new Player(1,0, [{score: 0, selection: Selection.None}],'name');

        const result = this.service.highestScorerHasFiveOrMorePoints(playerOne, playerTwo);

        expect(result).to.be.false;
    }
}
