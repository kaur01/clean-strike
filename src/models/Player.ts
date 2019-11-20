import {Selection} from "./Selection";

export interface Move {
    score: number;
    selection: string;
}

export class Player {
    constructor(private _score: number = 0, private _gameHistory: Move[] = []) {
    }

    get gameHistory(): Move[] {
        return this._gameHistory;
    }

    set gameHistory(value: Move[]) {
        this._gameHistory = value;
    }

    get score(): number {
        return this._score;
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

    public updateScore(player: Player, newScore: number) {
        player._score = player.score + newScore;
        player._score = player.score < 0 ? 0 : player.score;
    }

    public updateHistory(player: Player, move: Move) {
        player.gameHistory.push(move);
    }

    public isGreaterThanOrEqualToFive(score) {
        return score >= 5;
    }

    public getScore(): number {
        return this.score;
    }

}
