import { Choice } from "../../src/pages/Game/constants/ChoiceEnum";

describe("Game Test", () => {
	before(() => {
		cy.visit("/");
		cy.get(".play-game").click();
	});

	// The first test checks the behavior of the game when there is only one player
	it("Test players", () => {
		// We test the game with Player1 as the only player
		playerRun(Players.Player1);

		// We click the "select players" button to switch to a 2 player game
		cy.get("#select-players").click();

		// We test the game with two players
		playerRun(Players.Player2);
	});

	// The second test checks the game results for different combinations of player choices
	it("Test results", () => {
		// We visit the home page and start a new game
		cy.visit("/");
		cy.get(".play-game").click();
		// We switch to a 2 player game
		cy.get("#play-2-player").click();
		// We test all of the possible combinations of player choices
		Object.values(Players).forEach((t) => {
			// Rock vs Scissors
			playGame(Choice.Rock, Choice.Scissors, t);
			// Rock vs Lizard
			playGame(Choice.Rock, Choice.Lizard, t);
			// Paper vs Rock
			playGame(Choice.Paper, Choice.Rock, t);
			// Paper vs Spock
			playGame(Choice.Paper, Choice.Spock, t);
			// Scissors vs Paper
			playGame(Choice.Scissors, Choice.Paper, t);
			// Scissors vs Lizard
			playGame(Choice.Scissors, Choice.Lizard, t);
			// Spock vs Rock
			playGame(Choice.Spock, Choice.Rock, t);
			// Spock vs Scissors
			playGame(Choice.Spock, Choice.Scissors, t);
			// Lizard vs Paper
			playGame(Choice.Lizard, Choice.Paper, t);
			// Lizard vs Spock
			playGame(Choice.Lizard, Choice.Spock, t);
		});
	});
});

// This function simulates a player making a choice and checking the game result
function playerRun(player: Players) {
	// We determine which player we are simulating based on the "player" parameter
	let playerId = player == Players.Player1 ? 1 : 2;
	// We click the button to start the game with the specified player
	cy.get(`#play-${playerId}-player`).click();
	// If we are simulating Player2, we need to enter a name for Player1
	if (player == Players.Player2) {
		cy.get("#player_1").type(Players.Player1);
		cy.get("#play-game").click();
	}
	// We enter the name of the player we are simulating
	cy.get(`#player_${playerId}`).type(player);
	// We select a choice for the player
	cy.get(`.player_${playerId}`).within(() => {
		// We check that there are 5 choices available
		cy.get("button[content]").should("have.length", 5);
		// We click each choice and check that it is displayed on the screen
		Object.values(Choice).forEach((choice) => {
			cy.get(`button[content="${choice}"]`).click();
			cy.get(`div[show="${choice}"]`).should("exist");
		});
	});
	// We click the "play game" button to start the game
	cy.get("#play-game").click();
	// We check that the game element exists on the page
	cy.get("#game").should("exist");
	// We click the "result" element to show the game result
	cy.get("#result").click(0, 0);
	// We check that the winner is displayed on the screen
	cy.contains(`The winner is:`).should("exist");
	// Clear last results
	cy.get(`#clear-last-results`).click();
}

// This function simulates two players making choices and checks the game result
function playGame(win: Choice, lose: Choice, winner: Players) {
	// We determine the choices for each player based on the "winner" parameter
	let p1Choide = winner == Players.Player1 ? win : lose;
	let p2Choide = winner == Players.Player2 ? win : lose;
	// We enter the name of Player1
	cy.get("#player_1").clear().type(Players.Player1);
	// We select a choice for Player1
	cy.get(".player_1").within(() => {
		cy.get(`button[content="${p1Choide}"]`).click();
	});
	// We click the "play game" button to start the game
	cy.get("#play-game").click();
	// We enter the name of Player2
	cy.get("#player_2").clear().type(Players.Player2);
	// We select a choice for Player2
	cy.get(".player_2").within(() => {
		cy.get(`button[content="${p2Choide}"]`).click();
	});
	// We click the "play game" button to start the game
	cy.get("#play-game").click();
	// We check the game result to ensure that the correct winner is displayed
	cy.get("#result").within(() => {
		cy.contains(`The winner is: ${winner}`).should("exist");
	});
	// We click outside result for reset game
	cy.get("#result").click(0, 0);
}

// Players
export enum Players {
	Player1 = "Test Player 1",
	Player2 = "Test Player 2",
}
