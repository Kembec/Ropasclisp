<script lang="ts" setup>
	export interface Emits {
		(event: "selectPlayers", player: 1 | 2): void;
	}
	const emit = defineEmits<Emits>();
</script>
<template>
	<h1>Start Game</h1>
	<div class="types">
		<button id="play-1-player" @click="emit('selectPlayers', 1)">1 Player</button>
		<button id="play-2-player" @click="emit('selectPlayers', 2)">2 Players</button>
	</div>
</template>
<style lang="postcss" scoped>
	h1 {
		@apply mb-10 text-center text-5xl font-extrabold tracking-wider lg:mb-20 lg:text-6xl;
	}
	.types {
		@apply flex flex-col space-y-10 py-16 text-4xl lg:py-20 lg:text-6xl min-h-[50vh];
	}
	.types > button {
		@apply mx-auto flex rounded-md bg-slate-50 px-10 py-3 font-semibold text-slate-900 transition-all hover:font-bold hover:tracking-widest;
	}
</style>
