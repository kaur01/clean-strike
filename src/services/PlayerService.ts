require('reflect-metadata');
import {injectable} from "inversify";
import {Move, Player} from "../models/Player";

@injectable()
export class PlayerService {

    updateScore(player: Player, newScore: number): Player {
        return player.updateScore(player, newScore);
    }

    updateHistory(player: Player, move: Move): Player {
        return player.updateHistory(move);
    }

    hasThreeConsecutiveEmptyStrikes(player: Player): void {
        let count = 0;
        player.getGameHistory().forEach(move => {
            if (player.isEmptyStrike(move)) {
                count++;
            }
        });
        this.isEqualToThree(count, player);
    }

    hasThreeFouls(player: Player): void {
        let count = 0;
        player.getGameHistory().forEach(move => {
            if (player.isStrikerStrike(move) || player.isDefunct(move)) {
                count++;
            }
        });
        this.isEqualToThree(count, player);
    }

    hasFiveOrMorePoints(player: Player): boolean {
        return player.isGreaterThanOrEqualToFive(player.getScore());
    }


    isDifferenceThreeOrMore(playerOne: Player, playerTwo: Player): boolean | number {
        if (playerOne.getScore() > playerTwo.getScore()) {
            return playerOne.getScore() - playerTwo.getScore() >= 3;
        } else if (playerTwo.getScore() > playerOne.getScore()) {
            return playerTwo.getScore() - playerOne.getScore() >= 3;
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

    hasHighestScorer(playerOne: Player, playerTwo: Player): Player {
        if (playerOne.getScore() > playerTwo.getScore()) {
            return playerOne;
        } else if (playerTwo.getScore() > playerOne.getScore()) {
            return playerTwo;
        }
    }

    getName(player: Player): string {
        return player.getName();
    }

    private isEqualToThree(count: number, player: Player): void {
        if (count === 3) {
            this.updateScore(player, -1);
        }
    }
}
