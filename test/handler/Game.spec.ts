import {expect} from "chai";
import {Game} from "../../src/handler/Game";
import {suite, test} from 'mocha-typescript';
import {Board} from "../../src/models/Board";
import {Player} from "../../src/models/Player";
import {BoardService} from "../../src/services/BoardService";
import {PlayerService} from "../../src/services/PlayerService";
import {anything, deepEqual, instance, mock, spy, verify, when} from 'ts-mockito';

@suite
class GameSpec {
    private component: Game;
    private boardService: BoardService;
    private playerService: PlayerService;

    before(): void {
        this.boardService = mock(BoardService);
        this.playerService = mock(PlayerService);
        this.component = new Game(instance(this.boardService), instance(this.playerService));
    }

    @test
    public shouldDeclareDrawWhenNoCoinsAreAvailableAndTheDifferenceBetweenPlayersIsNotAtLeastThreePoints(): void {
        this.component.playerOne = new Player(3);
        this.component.playerTwo = new Player(1);
        this.component.board = new Board(0, 0);
        when(this.boardService.hasCoins(this.component.board)).thenReturn(false);
        when(this.playerService.isDifferenceThreeOrMore(this.component.playerOne,this.component.playerTwo)).thenReturn(false);
        when(this.playerService.highestScorerHasFiveOrMorePoints(this.component.playerOne,this.component.playerTwo)).thenReturn(true);


        this.component.start();

        expect(this.component.message).to.equal('Draw');
    }

    @test
    public shouldDeclareDrawWhenNoCoinsAreAvailableAndTheHighestScoringPlayerDoesNotAtLeastHaveFivePoints(): void {
        this.component.playerOne = new Player(3);
        this.component.playerTwo = new Player(1);
        this.component.board = new Board(0, 0);
        when(this.boardService.hasCoins(this.component.board)).thenReturn(false);
        when(this.playerService.isDifferenceThreeOrMore(this.component.playerOne,this.component.playerTwo)).thenReturn(true);
        when(this.playerService.highestScorerHasFiveOrMorePoints(this.component.playerOne,this.component.playerTwo)).thenReturn(false);

        this.component.start();

        expect(this.component.message).to.equal('Draw');
    }

    @test
    public shouldDeclareWinWhenNoCoinsAreAvailableAndBothWinningConditionsAreSatisfied(): void {
        this.component.playerOne = new Player(3);
        this.component.playerTwo = new Player(1);
        this.component.board = new Board(0, 0);
        when(this.boardService.hasCoins(this.component.board)).thenReturn(false);
        when(this.playerService.isDifferenceThreeOrMore(this.component.playerOne,this.component.playerTwo)).thenReturn(true);
        when(this.playerService.highestScorerHasFiveOrMorePoints(this.component.playerOne,this.component.playerTwo)).thenReturn(true);

        this.component.start();

        expect(this.component.message).to.equal('Win');
    }

    @test
    public shouldContinueTheGameIfCoinsAreAvailableAndTheCorrectOptionIsSelected(): void {
        this.component.board = new Board();
        this.component.playerOne = new Player(3);
        this.component.currentPlayer = this.component.playerOne;
        this.component.option = 5;
        when(this.boardService.hasCoins(this.component.board)).thenReturn(true);
        const spiedComponent = spy(this.component);

        this.component.start();

        verify(spiedComponent.onSelection(this.component.playerOne)).once();
    }

    @test
    public shouldDeclareAMessageWhenNoCorrectOptionIsSelected(): void {
        this.component.board = new Board();
        this.component.playerOne = new Player(3);
        this.component.currentPlayer = this.component.playerOne;
        this.component.option = 1;
        when(this.boardService.hasCoins(this.component.board)).thenReturn(true);

        this.component.start();

        expect(this.component.message).to.equal('Please enter a value between 1 and 6');
    }

    @test
    public shouldCallStrikeIfTheOptionIsOne(): void {
        this.component.board = new Board(8, 0);
        this.component.playerOne = new Player(2);
        when(this.boardService.strike(this.component.board)).thenReturn(1);
        this.component.option = 1;

        this.component.onSelection(this.component.playerOne);

        verify(this.boardService.strike(deepEqual(this.component.board))).once();
        verify(this.playerService.updateScore(deepEqual(this.component.playerOne), 1)).once();
        verify(this.playerService.updateHistory(deepEqual(this.component.playerOne), anything())).once();
    }

    @test
    public shouldCallMultiStrikeIfTheOptionIsTwo(): void {
        this.component.board = new Board(8, 0);
        this.component.playerOne = new Player(2);
        when(this.boardService.multiStrike(this.component.board)).thenReturn(2);
        this.component.option = 2;

        this.component.onSelection(this.component.playerOne);

        verify(this.boardService.multiStrike(deepEqual(this.component.board))).once();
        verify(this.playerService.updateScore(deepEqual(this.component.playerOne), 2)).once();
        verify(this.playerService.updateHistory(deepEqual(this.component.playerOne), anything())).once();
    }

    @test
    public shouldCallRedStrikeIfTheOptionIsThree(): void {
        this.component.board = new Board(8, 0);
        this.component.playerOne = new Player(2);
        when(this.boardService.redStrike(this.component.board)).thenReturn(3);
        this.component.option = 3;

        this.component.onSelection(this.component.playerOne);

        verify(this.boardService.redStrike(deepEqual(this.component.board))).once();
        verify(this.playerService.updateScore(deepEqual(this.component.playerOne), 3)).once();
        verify(this.playerService.updateHistory(deepEqual(this.component.playerOne), anything())).once();
    }

    @test
    public shouldCallStrikerStrikeIfTheOptionIsFour(): void {
        const strikeResult = -1;
        this.component.playerOne = new Player(2);
        when(this.boardService.strikerStrike()).thenReturn(strikeResult);
        this.component.option = 4;

        this.component.onSelection(this.component.playerOne);

        verify(this.boardService.strikerStrike()).once();
        verify(this.playerService.hasThreeFouls(this.component.playerOne)).once();
        verify(this.playerService.updateScore(deepEqual(this.component.playerOne), strikeResult)).once();
        verify(this.playerService.updateHistory(deepEqual(this.component.playerOne), anything())).once();
    }

    @test
    public shouldCallDefunctIfTheOptionIsFive(): void {
        this.component.board = new Board(8, 0);
        this.component.playerOne = new Player(2);
        when(this.boardService.defunct(this.component.board)).thenReturn(-1);
        this.component.option = 5;

        this.component.onSelection(this.component.playerOne);

        verify(this.boardService.defunct(this.component.board)).once();
        verify(this.playerService.hasThreeFouls(this.component.playerOne)).once();
        verify(this.playerService.updateScore(deepEqual(this.component.playerOne), -1)).once();
        verify(this.playerService.updateHistory(deepEqual(this.component.playerOne), anything())).once();
    }

    @test
    public shouldCallEmptyStrikeIfTheOptionIsSix(): void {
        this.component.playerOne = new Player(2);
        when(this.boardService.emptyStrike()).thenReturn(-1);
        this.component.option = 6;

        this.component.onSelection(this.component.playerOne);

        verify(this.boardService.emptyStrike()).once();
        this.playerService.hasThreeConsecutiveEmptyStrikes(this.component.playerOne);
        verify(this.playerService.updateScore(deepEqual(this.component.playerOne), -1)).once();
        verify(this.playerService.updateHistory(deepEqual(this.component.playerOne), anything())).once();
    }
}
