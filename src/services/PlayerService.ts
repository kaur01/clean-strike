require('reflect-metadata');
import {injectable} from "inversify";
import {Move, Player} from "../models/Player";

@injectable()
export class PlayerService {

    updateScore(player: Player, newScore: number): Player {
        return player.updateScore(player, newScore);
    }

    updateHistory(player: Player, move: Move): Player {
        return player.updateHistory(player, move);
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
        return player.isGreaterThanOrEqualToFive(player.score);
    }


    isDifferenceThreeOrMore(playerOne: Player, playerTwo: Player): boolean | number {
        if (playerOne.score > playerTwo.score) {
            return playerOne.score - playerTwo.score >= 3;
        } else if (playerTwo.score > playerOne.score) {
            return playerTwo.score - playerOne.score >= 3;
        } else {
            return 0;
        }
    }

    getScore(player: Player): number {
        return player.getScore();
    }

    highestScorerHasFiveOrMorePoints(playerOne: Player, playerTwo: Player): boolean {
        const highestScorer = this.hasHighestScorer(playerOne, playerTwo);
        if (highestScorer) {
            return this.hasFiveOrMorePoints(highestScorer);
        }
    }

    private isEqualToThree(count: number, player: Player): void {
        if (count === 3) {
            this.updateScore(player, -1);
        }
    }

    public hasHighestScorer(playerOne: Player, playerTwo: Player): Player {
        if (playerOne.getScore() > playerTwo.getScore()) {
            return playerOne;
        } else if (playerTwo.getScore() > playerOne.getScore()) {
            return playerTwo;
        }
    }
}
