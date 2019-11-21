export class Board {

    constructor(private blackCoins: number = 9, private redCoins: number = 1) {
    }

    getBlackCoins() {
        return this.blackCoins;
    }

    getRedCoins() {
        return this.redCoins;
    }

    hasBlackCoins() {
        return this.blackCoins > 0;
    }

    hasRedCoins() {
        return this.redCoins > 0;
    }

    hasCoins(){
        return this.hasRedCoins() && this.hasBlackCoins();
    }

    removeCoins(coinType: CoinType, deduction: number): void {
        coinType === CoinType.BLACK ? this.blackCoins = this.blackCoins - deduction : this.redCoins = this.redCoins - deduction;
    }
}

export enum CoinType {
    BLACK = 'black',
    RED = 'red'
}

