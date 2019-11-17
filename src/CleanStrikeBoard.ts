export class CleanStrikeBoard {

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

    strike(): number {
        if (this._blackCoins === 0) {
            return 0;
        }
        this._blackCoins = this._blackCoins - 1;
        return 1;
    }

}
