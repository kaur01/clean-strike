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
       this.board.blackCoins = 0;

        const result = this.board.hasBlackCoins();

        expect(result).to.be.false;
    }


    @test
    public async shouldReturnTrueIfBoardHasRedCoins(): Promise<void> {

        const result = this.board.hasRedCoins();

        expect(result).to.be.true;
    }

    @test
    public async shouldReturnFalseIfBoardDoesNotHaveRedCoins(): Promise<void> {
       this.board.redCoins = 0;

        const result = this.board.hasRedCoins();

        expect(result).to.be.false;
    }

    @test
    public async shouldRemoveBlackCoins(): Promise<void> {

        this.board.removeCoins(CoinType.BLACK, 2);

        expect(this.board.blackCoins).to.equal(7);
    }

    @test
    public async shouldRemoveRedCoins(): Promise<void> {

        this.board.removeCoins(CoinType.RED, 1);

        expect(this.board.redCoins).to.equal(0);
    }
}
