require('reflect-metadata');
import {injectable} from "inversify";
import {Board} from "../models/Board";

@injectable()
export class BoardService {


    strike(board: Board): number {
        if (board.blackCoins === 0) {
            return 0;
        }
        board.blackCoins = board.blackCoins - 1;
        return 1;
    }

    multiStrike(board: Board): number {
        if (board.blackCoins === 0) {
            return 0;
        }
        board.blackCoins = board.blackCoins - 2;
        return 2;
    }

    redStrike(board: Board): number {
        if (board.redCoins === 0) {
            return 0;
        }
        board.redCoins = board.redCoins - 1;
        return 3;
    }

    defunct(board: Board): number {
        if (board.blackCoins === 0) {
            return 0;
        }
        board.blackCoins = board.blackCoins - 1;
        return -2;
    }

    strikerStrike(): number {
        return -1;
    }

    emptyStrike(): number {
        return 0;
    }
}
