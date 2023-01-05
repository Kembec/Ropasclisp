import { Player } from "./PlayerClass";
import { Choice } from "../constants/ChoiceEnum";
import type GameInterface from "../interfaces/GameInterface"

export class Game implements GameInterface {
	player1: Player;
	player2: Player;

	constructor(player1Name: string, player1Choice: Choice, player2Name?: string, player2Choice?: Choice) {
		this.player1 = new Player(player1Name, player1Choice);
        this.player2 = new Player(player2Name, player2Choice);
	}

	play(): string {
		if (this.player1.choice === this.player2.choice) {
			return "Draw";
		} else if (
			(this.player1.choice === Choice.Rock && this.player2.choice === Choice.Scissors) ||
			(this.player1.choice === Choice.Rock && this.player2.choice === Choice.Lizard) ||
			(this.player1.choice === Choice.Paper && this.player2.choice === Choice.Rock) ||
			(this.player1.choice === Choice.Paper && this.player2.choice === Choice.Spock) ||
			(this.player1.choice === Choice.Scissors && this.player2.choice === Choice.Paper) ||
			(this.player1.choice === Choice.Scissors && this.player2.choice === Choice.Lizard) ||
			(this.player1.choice === Choice.Spock && this.player2.choice === Choice.Rock) ||
			(this.player1.choice === Choice.Spock && this.player2.choice === Choice.Scissors) ||
			(this.player1.choice === Choice.Lizard && this.player2.choice === Choice.Paper) ||
			(this.player1.choice === Choice.Lizard && this.player2.choice === Choice.Spock)
		) {
			return this.player1.name;
		} 
        return this.player2.name;
	}
}
