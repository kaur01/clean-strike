export class Board {

    constructor(private _blackCoins: number = 9, private _redCoins: number = 1) {
    }

    get blackCoins(): number {
        return this._blackCoins;
    }

    set blackCoins(value: number) {
        this._blackCoins = value;
    }

    get redCoins(): number {
        return this._redCoins;
    }

    set redCoins(value: number) {
        this._redCoins = value;
    }

    hasBlackCoins(board: Board) {
        return board.blackCoins === 0;
    }

    hasRedCoins(board: Board) {
        return board.redCoins === 0;
    }
}
