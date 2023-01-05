<script setup lang="ts">
	import { defineComponent, ref } from "vue";
	import { Choice } from "./Game/constants/ChoiceEnum";
</script>
<template>
	<div class="rules">
		<h1>Rules</h1>
		<!-- Rock -->
		<div class="winner">
			<div class="icon">
				<font-awesome-icon :icon="'fa-regular ' + Choice.Rock" />
			</div>
			<span class="win title">Rock</span>
		</div>
		<div class="wins-to">
			<h2>Win To</h2>
			<div>
				<div class="icon">
					<font-awesome-icon :icon="'fa-regular ' + Choice.Scissors" />
				</div>
				<span class="lose title">Scissors</span>
			</div>
			<div>
				<div class="icon">
					<font-awesome-icon :icon="'fa-regular ' + Choice.Lizard" />
				</div>
				<span class="lose title">Lizard</span>
			</div>
		</div>
		<!-- Paper -->
		<div class="winner">
			<div class="icon">
				<font-awesome-icon :icon="'fa-regular ' + Choice.Paper" />
			</div>
			<span class="win title">Paper</span>
		</div>
		<div class="wins-to">
			<h2>Win To</h2>
			<div>
				<div class="icon">
					<font-awesome-icon :icon="'fa-regular ' + Choice.Rock" />
				</div>
				<span class="lose title">Rock</span>
			</div>
			<div>
				<div class="icon">
					<font-awesome-icon :icon="'fa-regular ' + Choice.Spock" />
				</div>
				<span class="lose title">Spock</span>
			</div>
		</div>
		<!-- Scissors -->
		<div class="winner">
			<div class="icon">
				<font-awesome-icon :icon="'fa-regular ' + Choice.Scissors" />
			</div>
			<span class="win title">Scissors</span>
		</div>
		<div class="wins-to">
			<h2>Win To</h2>
			<div>
				<div class="icon">
					<font-awesome-icon :icon="'fa-regular ' + Choice.Paper" />
				</div>
				<span class="lose title">Paper</span>
			</div>
			<div>
				<div class="icon">
					<font-awesome-icon :icon="'fa-regular ' + Choice.Lizard" />
				</div>
				<span class="lose title">Lizard</span>
			</div>
		</div>
		<!-- Spock -->
		<div class="winner">
			<div class="icon">
				<font-awesome-icon :icon="'fa-regular ' + Choice.Spock" />
			</div>
			<span class="win title">Spock</span>
		</div>
		<div class="wins-to">
			<h2>Win To</h2>
			<div>
				<div class="icon">
					<font-awesome-icon :icon="'fa-regular ' + Choice.Rock" />
				</div>
				<span class="lose title">Rock</span>
			</div>
			<div>
				<div class="icon">
					<font-awesome-icon :icon="'fa-regular ' + Choice.Scissors" />
				</div>
				<span class="lose title">Scissors</span>
			</div>
		</div>
		<!-- Lizard -->
		<div class="winner">
			<div class="icon">
				<font-awesome-icon :icon="'fa-regular ' + Choice.Lizard" />
			</div>
			<span class="win title">Lizard</span>
		</div>
		<div class="wins-to">
			<h2>Win To</h2>
			<div>
				<div class="icon">
					<font-awesome-icon :icon="'fa-regular ' + Choice.Paper" />
				</div>
				<span class="lose title">Paper</span>
			</div>
			<div>
				<div class="icon">
					<font-awesome-icon :icon="'fa-regular ' + Choice.Spock" />
				</div>
				<span class="lose title">Spock</span>
			</div>
		</div>
		<RouterLink class="play-game" to="/game">Play Game</RouterLink>
	</div>
</template>
<style lang="postcss" scoped>
	.rules {
		@apply flex h-full w-full flex-col pb-20;
	}
	h1 {
		@apply my-7 flex justify-center text-center text-6xl font-bold tracking-wider;
	}

	.icon {
		@apply relative mx-auto rounded-full bg-white;
	}
	.icon > svg {
		@apply absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2;
	}

	.winner {
		@apply flex flex-col justify-center p-10 lg:p-20;
	}
	.winner > .icon {
		@apply p-24 text-8xl text-slate-900;
	}
	.winner .title {
		@apply text-2xl lg:text-3xl;
	}

	.title {
		@apply mx-auto  mt-10 rounded-lg px-5 py-3 tracking-wider text-white;
	}
	.title.win {
		@apply bg-emerald-500;
	}
	.title.lose {
		@apply bg-red-500;
	}

	.wins-to {
		@apply grid grid-cols-2 justify-center gap-5 border-b border-white/10 px-10 pb-20 text-6xl lg:px-[15vw];
	}
	.wins-to > h2 {
		@apply col-span-full justify-center p-10 text-center text-4xl;
	}
	.wins-to > div {
		@apply flex flex-col;
	}
	.wins-to .icon {
		@apply mx-auto p-14 text-6xl text-slate-900;
	}
	.wins-to .title {
		@apply text-xl lg:text-2xl;
	}

	.play-game {
		@apply mx-auto mt-10 rounded-lg bg-amber-500 px-10 py-5 text-4xl font-bold text-white drop-shadow-md hover:bg-amber-400 lg:mt-20 lg:text-5xl;
	}
</style>
