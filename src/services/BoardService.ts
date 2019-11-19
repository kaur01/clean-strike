require('reflect-metadata');
import {injectable} from "inversify";
import {Board, CoinType} from "../models/Board";

@injectable()
export class BoardService {


    strike(board: Board): number {
        if (!board.hasBlackCoins()) {
            return 0;
        }
        board.removeCoins(CoinType.BLACK, 1);
        return 1;
    }

    multiStrike(board: Board): number {
        if (!board.hasBlackCoins()) {
            return 0;
        }
        board.removeCoins(CoinType.BLACK, 2);
        return 2;
    }

    redStrike(board: Board): number {
        if (!board.hasRedCoins()) {
            return 0;
        }
        board.removeCoins(CoinType.RED, 1);
        return 3;
    }

    defunct(board: Board): number {
        if (!board.hasBlackCoins()) {
            return 0;
        }
        board.removeCoins(CoinType.BLACK, 1);
        return -2;
    }

    strikerStrike(): number {
        return -1;
    }

    emptyStrike(): number {
        return 0;
    }
}
