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

    hasBlackCoins() {
        return this.blackCoins > 0;
    }

    hasRedCoins() {
        return this.redCoins > 0;
    }

    removeCoins(coinType: CoinType, deduction: number): void {
        coinType === CoinType.BLACK ? this.blackCoins = this.blackCoins - deduction : this.redCoins = this.redCoins - deduction;
    }
}

export enum CoinType {
    BLACK = 'black',
    RED = 'red'
}

