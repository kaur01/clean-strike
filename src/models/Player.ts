import {Selection} from "./Selection";

export interface Move {
    score: number;
    selection: string;
}

export class Player {
    constructor(private _score: number = 0, private _gameHistory?: Move[]) {
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

    set score(value: number) {
        this._score = value;
    }

    public isEmptyStrike(move :  Move) {
        return move.selection === Selection.None;
    }
}
