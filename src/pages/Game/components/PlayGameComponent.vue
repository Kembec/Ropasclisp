<script lang="ts" setup>
	import { computed, onMounted, ref } from "vue";
	import { Game } from "../classes/GameClass";
	import { Choice } from "../constants/ChoiceEnum";
	import Result from "./PlayGame/ResultComponent.vue";

	// Interfaces
	export interface Props {
		players: 1 | 2;
	}
	export interface Emits {
		(event: "changeResult"): void;
		(event: "selectPlayers"): void;
	}

	// Props
	const prop = defineProps<Props>();

	// Emits
	const emit = defineEmits<Emits>();

	// Data
	const player1Name = ref<string>("Player 1");
	const player2Name = ref<string>();
	const player1Choice = ref<Choice>(Choice.Rock);
	const player2Choice = ref<Choice>();
	const resultMessage = ref<string>();
	const turn = ref<1 | 2>(1);

	// Mounted
	onMounted(() => {
		if (prop.players == 2) {
			// if there are 2 players
			player2Name.value = "Player 2"; // set player 2's name
		}
		focusAndSelect("player_1"); // focus on player 1's input field
	});

	// Computed
	const p1choice = computed<Choice | null>(() => {
		if (turn.value != 1) {
			return null;
		}
		return player1Choice.value;
	});
	const p2choice = computed<Choice | null>(() => {
		if (turn.value != 2 || !player2Choice.value) {
			return null;
		}
		return player2Choice.value;
	});
	const buttonText = computed<string>(() => {
		if (turn.value == 1 && prop.players == 2) {
			// if it is player 1's turn and there are 2 players
			return "Next Player";
		}
		return "Play Game";
	});

	// Methods
	function startGame(): void {
		if (prop.players == 2 && turn.value == 1) {
			// if there are 2 players and it is player 1's turn
			turn.value = 2;
			player2Name.value == "Player 2" ? focusAndSelect("player_2") : null;
			return;
		}
		const game = new Game(player1Name.value, player1Choice.value, player2Name.value, player2Choice.value);
		player1Name.value = game.player1.name;
		player1Choice.value = game.player1.choice;
		player2Name.value = game.player2.name;
		player2Choice.value = game.player2.choice;
		
		// create a new Game with the given player names and choices
		resultMessage.value = `The winner is: ${game.play()}`;
		saveResult();
		emit("changeResult");
	}
	function clearData(): void {
		turn.value = 1;
		player1Choice.value = Choice.Rock;
		player2Choice.value = Choice.Rock;
		resultMessage.value = "";
	}
	function changeName(event: Event | null | undefined, player: 1 | 2): void {
		if (!event || (player == 2 && prop.players != 2)) {
			// if there is no event or if it is player 2's turn and there is only 1 player
			return;
		}
		const playerName = (event.target as HTMLInputElement).textContent; // get the player name from the event target
		if (player == 1) {
			player1Name.value = playerName ?? "Player 1";
			return;
		}
		player2Name.value = playerName ?? "Player 2";
	}
	function saveResult(): void {
		// saves the game result to local storage
		if (!localStorage.result) {
			localStorage.result = JSON.stringify([]);
		}
		let result = JSON.parse(localStorage.result);
		let data = {
			p1: player1Name.value,
			choice1: player1Choice.value,
			p2: player2Name.value,
			choice2: player2Choice.value,
			message: resultMessage.value,
		};
		result.push(data);
		localStorage.result = JSON.stringify(result);
	}
	function focusAndSelect(id: string): void {
		//  focuses on and selects an input field
		const element = document.getElementById(id) as HTMLHeadingElement;
		if (!element) {
			return;
		}
		element.focus();
		const range = document.createRange();
		range.selectNodeContents(element);
		const selection = window.getSelection();
		selection?.removeAllRanges();
		selection?.addRange(range);
	}
	function selectPlayers(): void {
		emit("selectPlayers");
	}
</script>

<template>
	<div class="play-game">
		<div class="player_1" :class="turn == 1 ? 'on' : 'off'">
			<h1 id="player_1" contenteditable="true" @input="changeName($event, 1)">{{ player1Name }}</h1>
			<div class="selected-hand" :show="p1choice">
				<font-awesome-icon :icon="'fa-regular ' + (p1choice ?? 'fa-hand-peace')" />
			</div>
			<div class="hands">
				<button :content="h" v-for="(h, n) in Choice" :key="n" @click="player1Choice = h">
					<font-awesome-icon :icon="'fa-regular ' + h" />
				</button>
			</div>
		</div>
		<div class="player_2" :class="turn == 2 ? 'on' : 'off'">
			<h1 id="player_2" :contenteditable="players === 2" @input="changeName($event, 2)">{{ player2Name }}</h1>
			<div class="selected-hand" :show="p2choice">
				<font-awesome-icon :icon="'fa-regular ' + (p2choice ?? 'fa-hand-peace')" />
			</div>
			<div class="hands">
				<button :content="h" v-for="(h, n) in Choice" :key="n" @click="player2Name ? (player2Choice = h) : null">
					<font-awesome-icon :icon="'fa-regular ' + h" />
				</button>
			</div>
		</div>
		<div class="footer">
			<button id="play-game" @click="startGame()"> {{ buttonText }} </button>
			<button id="select-players" @click="selectPlayers()"> Select Players </button>
		</div>
	</div>
	<Result v-if="resultMessage" :message="resultMessage" :p1Choice="player1Choice" :p2Choice="player2Choice" @close="clearData" />
</template>

<style lang="postcss" scoped>
	.play-game {
		@apply grid grid-cols-2 gap-x-5 gap-y-16 lg:gap-x-16;
	}
	.play-game > * {
		@apply relative flex flex-col;
	}
	.play-game > * > h1 {
		@apply mb-auto flex justify-center p-5 text-center text-3xl lg:text-6xl;
	}
	.play-game > * > span {
		@apply mx-auto mt-10 flex justify-center rounded-lg bg-emerald-500 px-5 py-1.5 text-2xl text-white;
	}
	.play-game > .off {
		@apply before:absolute before:top-0 before:left-0 before:z-50 before:h-full before:w-full before:cursor-not-allowed before:rounded-xl before:bg-black/20;
	}

	.player_1 > .selected-hand {
		transform: scaleX(-1);
	}
	.player_1 > .hands {
		transform: scaleX(-1);
	}

	.selected-hand {
		@apply relative mx-auto mt-5 rounded-full bg-white p-12 text-4xl text-slate-900 drop-shadow-md lg:mt-10 lg:p-24 lg:text-8xl;
	}
	.selected-hand > svg {
		@apply absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2;
	}

	.hands {
		@apply mt-7 grid grid-cols-2 gap-x-0 gap-y-7 p-3 text-4xl lg:mt-16 lg:grid-cols-5 lg:gap-x-5 lg:p-10 lg:text-5xl;
	}
	.hands > * {
		@apply mx-auto flex justify-center hover:opacity-80;
	}

	.footer {
		@apply col-span-full flex flex-col space-y-5;
	}
	.footer > button {
		@apply mx-auto rounded-lg px-10 font-bold drop-shadow-md;
	}
	#play-game {
		@apply bg-white py-3 text-3xl text-slate-900 hover:bg-white/90 lg:text-4xl;
	}
	#select-players {
		@apply border-2 border-white py-2 text-sm tracking-wider text-white hover:border-white/80 lg:text-base;
	}
</style>
