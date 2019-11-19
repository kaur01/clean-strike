import {expect} from 'chai';
import {suite, test} from 'mocha-typescript';
import {Board} from "../../src/models/Board";

@suite
class BoardSpec {
    private board: Board;

    before() {
        this.board = new Board();
    }

    @test
    public async shouldReturnFalseIfBoardHasBlackCoins(): Promise<void> {
        const board = new Board();

        const result = this.board.hasBlackCoins(board);

        expect(result).to.be.false;
    }

    @test
    public async shouldReturnTrueIfBoardDoesNotHaveBlackCoins(): Promise<void> {
        const board = new Board(0);

        const result = this.board.hasBlackCoins(board);

        expect(result).to.be.true;
    }


    @test
    public async shouldReturnFalseIfBoardHasRedCoins(): Promise<void> {
        const board = new Board();

        const result = this.board.hasRedCoins(board);

        expect(result).to.be.false;
    }

    @test
    public async shouldReturnTrueIfBoardDoesNotHaveRedCoins(): Promise<void> {
        const board = new Board(0,0);

        const result = this.board.hasRedCoins(board);

        expect(result).to.be.true;
    }
}
