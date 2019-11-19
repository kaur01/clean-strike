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

    hasThreeConsecutiveEmptyStrikes(player: Player): void {
        let count = 0;
        player.gameHistory.forEach(move => {
            if (player.isEmptyStrike(move)) {
                count++;
            }
        });
        this.isEqualToThree(count, player);
    }

    hasThreeFouls(player: Player): void {
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

    isDifferenceThreeOrMore(playerOne: Player, playerTwo: Player): boolean|number {
        if (playerOne.score > playerTwo.score) {
            return playerOne.score - playerTwo.score >= 3;
        } else if (playerTwo.score > playerOne.score) {
            return playerTwo.score - playerOne.score >= 3;
        } else {
            return 0;
        }
    }

    private isEqualToThree(count: number, player: Player) {
        if (count === 3) {
            this.updateScore(player, -1);
        }
    }
}
