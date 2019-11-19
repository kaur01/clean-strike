require('reflect-metadata');
import {injectable} from "inversify";
import {Move, Player} from "../models/Player";

@injectable()
export class PlayerService {

    updateScore(player: Player, newScore: number): void {
        player.updateScore(player, newScore);
    }

    updateHistory(player: Player, move: Move): void {
        player.updateHistory(player, move);
    }

    checkForThreeConsecutiveEmptyStrikes(player: Player): void {
        let count = 0;
        player.gameHistory.forEach(move => {
            if (player.isEmptyStrike(move)) {
                count++;
            }
        });
        this.isEqualToThree(count, player);
    }

    checkForThreeFouls(player: Player): void {
        let count = 0;
        player.gameHistory.forEach(move => {
            if (player.isStrikerStrike(move) || player.isDefunct(move)) {
                count++;
            }
        });
        this.isEqualToThree(count, player);
    }

    hasFiveOrMorePoints(player: Player): boolean {
        return player.score >= 5;
    }

    private isEqualToThree(count: number, player: Player) {
        if (count === 3) {
            this.updateScore(player, -1);
        }
    }
}
