import {expect} from 'chai';
import {suite, test} from 'mocha-typescript';
import {Board, CoinType} from "../../src/models/Board";

@suite
class BoardSpec {
    private board: Board;

    before() {
        this.board = new Board();
    }

    @test
    public async shouldReturnTrueIfBoardHasBlackCoins(): Promise<void> {
        const result = this.board.hasBlackCoins();

        expect(result).to.be.true;
    }

    @test
    public async shouldReturnFalseIfBoardDoesNotHaveBlackCoins(): Promise<void> {
        const board = new Board(0);

        const result = board.hasBlackCoins();

        expect(result).to.be.false;
    }


    @test
    public async shouldReturnTrueIfBoardHasRedCoins(): Promise<void> {

        const result = this.board.hasRedCoins();

        expect(result).to.be.true;
    }

    @test
    public async shouldReturnFalseIfBoardDoesNotHaveRedCoins(): Promise<void> {
        const board = new Board(0,0);

        const result = board.hasRedCoins();

        expect(result).to.be.false;
    }

    @test
    public async shouldRemoveBlackCoins(): Promise<void> {

        this.board.removeCoins(CoinType.BLACK, 2);

        expect(this.board.getBlackCoins()).to.equal(7);
    }

    @test
    public async shouldRemoveRedCoins(): Promise<void> {

        this.board.removeCoins(CoinType.RED, 1);

        expect(this.board.getRedCoins()).to.equal(0);
    }

    @test
    public async shouldReturnTrueIfAnyCoinsPresent(): Promise<void> {
        const result = this.board.hasCoins();

        expect(result).to.be.true;
    }

    @test
    public async shouldReturnFalseIfAnyCoinsPresent(): Promise<void> {
        const board = new Board(0,0);

        const result = board.hasCoins();

        expect(result).to.be.false;
    }
}
