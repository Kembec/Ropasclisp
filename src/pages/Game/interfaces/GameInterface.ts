import type { Player } from "../classes/PlayerClass";

export default interface GameInterface {
	player1: Player;
	player2: Player;
	play(): string;
}
