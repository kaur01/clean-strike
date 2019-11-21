import {Selection} from "./Selection";

export interface Move {
    score: number;
    selection: string;
}

export class Player {
    constructor(private readonly id : number, private score: number, private readonly gameHistory: Move[]=[], private readonly name: string) {
    }

    public getScore(): number {
        return this.score;
    }

    public getName(): string {
        return this.name;
    }

    public getGameHistory() {
        return this.gameHistory;
    }

    public isEmptyStrike(move: Move) {
        return move.selection === Selection.None;
    }

    public isStrikerStrike(move: Move) {
        return move.selection === Selection.StrikerStrike;
    }

    public isDefunct(move: Move) {
        return move.selection === Selection.DefunctCoin;
    }

    public updateScore(newScore: number): Player {
        this.score = this.score + newScore;
        this.score = this.score < 0 ? 0 : this.score;
        return this;
    }

    public updateHistory(move: Move): Player {
        this.gameHistory.push(move);
        return this;

    }

    public isGreaterThanOrEqualToFive(score) {
        return score >= 5;
    }

}
