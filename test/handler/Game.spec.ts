import {expect} from "chai";
import {Game} from "../../src/handler/Game";
import {suite, test} from 'mocha-typescript';
import {Board} from "../../src/models/Board";
import {Player} from "../../src/models/Player";
import {BoardService} from "../../src/services/BoardService";
import {PlayerService} from "../../src/services/PlayerService";
import {anything, deepEqual, instance, mock, verify, when} from 'ts-mockito';

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
        this.component.playerOne = new Player(1, 3, [], 'playerOne');
        this.component.playerTwo = new Player(2, 1, [], 'playerTwo');
        this.component.board = new Board(0, 0);
        when(this.boardService.hasCoins(this.component.board)).thenReturn(false);
        when(this.playerService.isDifferenceThreeOrMore(this.component.playerOne, this.component.playerTwo)).thenReturn(false);
        when(this.playerService.highestScorerHasFiveOrMorePoints(this.component.playerOne, this.component.playerTwo)).thenReturn(true);


        this.component.start();

        expect(this.component.message).to.equal('Draw');
    }

    @test
    public shouldDeclareDrawWhenNoCoinsAreAvailableAndTheHighestScoringPlayerDoesNotAtLeastHaveFivePoints(): void {
        this.component.playerOne = new Player(1, 3, [], 'playerOne');
        this.component.playerTwo = new Player(2, 1, [], 'playerTwo');
        this.component.board = new Board(0, 0);
        when(this.boardService.hasCoins(this.component.board)).thenReturn(false);
        when(this.playerService.isDifferenceThreeOrMore(this.component.playerOne, this.component.playerTwo)).thenReturn(true);
        when(this.playerService.highestScorerHasFiveOrMorePoints(this.component.playerOne, this.component.playerTwo)).thenReturn(false);

        this.component.start();

        expect(this.component.message).to.equal('Draw');
    }

    @test
    public shouldDeclareWinWhenNoCoinsAreAvailableAndBothWinningConditionsAreSatisfied(): void {
        this.component.playerOne = new Player(1, 3, [], 'playerOne');
        this.component.playerTwo = new Player(2, 1, [], 'playerTwo');
        this.component.board = new Board(0, 0);
        when(this.boardService.hasCoins(this.component.board)).thenReturn(false);
        when(this.playerService.isDifferenceThreeOrMore(this.component.playerOne, this.component.playerTwo)).thenReturn(true);
        when(this.playerService.highestScorerHasFiveOrMorePoints(this.component.playerOne, this.component.playerTwo)).thenReturn(true);

        this.component.start();

        expect(this.component.message).to.equal('Win');
    }


    @test
    public shouldDeclareAMessageWhenNoCorrectOptionIsSelected(): void {
        this.component.selectedOptions = [7];
        this.component.board = new Board();
        this.component.playerOne = new Player(1, 3, [], 'playerOne');
        this.component.currentPlayer = this.component.playerOne;
        when(this.boardService.hasCoins(this.component.board)).thenReturn(true);

        this.component.start();

        expect(this.component.message).to.equal('Please enter a value between 1 and 6');
    }

    @test
    public shouldCallStrikeIfTheOptionIsOneAndContinueTheGameIfCoinsAreAvailable(): void {
        this.component.selectedOptions = [1];
        const playerToBeUpdated = new Player(1,0,[],'playerOne');
        this.component.playerOne = new Player(1, 1, [], 'playerOne');
        const currentPlayerName = this.component.currentPlayer.getName();
        when(this.boardService.hasCoins(this.component.board)).thenReturn(true);
        when(this.boardService.strike(this.component.board)).thenReturn(1);
        when(this.playerService.getName(this.component.currentPlayer)).thenReturn(currentPlayerName);

        this.component.start();

        verify(this.boardService.strike(this.component.board)).once();
        verify(this.playerService.updateScore(deepEqual(playerToBeUpdated), 1)).once();
        verify(this.playerService.updateHistory(deepEqual(playerToBeUpdated), anything())).once();
    }

    @test
    public shouldCallMultiStrikeIfTheOptionIsTwoAndContinueTheGameIfCoinsAreAvailable(): void {
        const currentPlayerName = this.component.currentPlayer.getName();
        this.component.selectedOptions = [2];

        const playerToBeUpdated = new Player(1,0,[],'playerOne');
        this.component.playerOne = new Player(1, 2, [], 'playerOne');

        when(this.boardService.hasCoins(this.component.board)).thenReturn(true);
        when(this.boardService.multiStrike(this.component.board)).thenReturn(2);
        when(this.playerService.getName(this.component.currentPlayer)).thenReturn(currentPlayerName);

        this.component.start();

        verify(this.boardService.multiStrike(deepEqual(this.component.board))).once();
        verify(this.playerService.updateScore(deepEqual(playerToBeUpdated), 2)).once();
        verify(this.playerService.updateHistory(deepEqual(playerToBeUpdated), anything())).once();
    }

    @test
    public shouldCallRedStrikeIfTheOptionIsThreeAndContinueTheGameIfCoinsAreAvailable(): void {
        const currentPlayerName = this.component.currentPlayer.getName();
        this.component.selectedOptions = [3];

        const playerToBeUpdated = new Player(1,0,[],'playerOne');
        this.component.playerOne = new Player(1, 3, [], 'playerOne');

        when(this.boardService.hasCoins(this.component.board)).thenReturn(true);
        when(this.boardService.redStrike(this.component.board)).thenReturn(3);
        when(this.playerService.getName(this.component.currentPlayer)).thenReturn(currentPlayerName);

        this.component.start();

        verify(this.boardService.redStrike(deepEqual(this.component.board))).once();
        verify(this.playerService.updateScore(deepEqual(playerToBeUpdated), 3)).once();
        verify(this.playerService.updateHistory(deepEqual(playerToBeUpdated), anything())).once();
    }

    @test
    public shouldCallStrikerStrikeIfTheOptionIsFourAndContinueTheGameIfCoinsAreAvailable(): void {
        const currentPlayerName = this.component.currentPlayer.getName();
        this.component.selectedOptions = [4];

        const playerToBeUpdated = new Player(1,0,[],'playerOne');
        this.component.playerOne = new Player(1, 0, [], 'playerOne')

        when(this.boardService.hasCoins(this.component.board)).thenReturn(true);
        when(this.boardService.strikerStrike()).thenReturn(-1);
        when(this.playerService.getName(this.component.currentPlayer)).thenReturn(currentPlayerName);

        this.component.start();

        verify(this.boardService.strikerStrike()).once();
        verify(this.playerService.hasThreeFouls(deepEqual(playerToBeUpdated))).once();
        verify(this.playerService.updateScore(deepEqual(playerToBeUpdated), -1)).once();
        verify(this.playerService.updateHistory(deepEqual(playerToBeUpdated), anything())).once();
    }

    @test
    public shouldCallDefunctIfTheOptionIsFive(): void {
        const currentPlayerName = this.component.currentPlayer.getName();
        this.component.selectedOptions = [5];

        const playerToBeUpdated = new Player(1,0,[],'playerOne');
        this.component.playerOne = new Player(1, 0, [], 'playerOne');

        when(this.boardService.hasCoins(this.component.board)).thenReturn(true);
        when(this.boardService.defunct(this.component.board)).thenReturn(-2);
        when(this.playerService.getName(this.component.currentPlayer)).thenReturn(currentPlayerName);


        this.component.start();

        verify(this.boardService.defunct(this.component.board)).once();
        verify(this.playerService.hasThreeFouls(deepEqual(playerToBeUpdated))).once();
        verify(this.playerService.updateScore(deepEqual(playerToBeUpdated), -2)).once();
        verify(this.playerService.updateHistory(deepEqual(playerToBeUpdated), anything())).once();
    }

    @test
    public shouldCallEmptyStrikeIfTheOptionIsSix(): void {
        const currentPlayerName = this.component.currentPlayer.getName();
        this.component.selectedOptions = [6];

        const playerToBeUpdated = new Player(1,0,[],'playerOne');
        this.component.playerOne = new Player(1, 0, [], 'playerOne');

        when(this.boardService.hasCoins(this.component.board)).thenReturn(true);
        when(this.boardService.emptyStrike()).thenReturn(-1);
        when(this.playerService.getName(this.component.currentPlayer)).thenReturn(currentPlayerName);

        this.component.start();

        verify(this.boardService.emptyStrike()).once();
        verify(this.playerService.hasThreeConsecutiveEmptyStrikes(deepEqual(playerToBeUpdated))).once();
        verify(this.playerService.updateScore(deepEqual(playerToBeUpdated), -1)).once();
        verify(this.playerService.updateHistory(deepEqual(playerToBeUpdated), anything())).once();
    }
}
