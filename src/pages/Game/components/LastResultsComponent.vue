<script setup lang="ts">
	import type Result from "../interfaces/ResultInterface";
	// Intrefaces
	export interface Props {
		lastResults: Result[];
	}
	export interface Emits {
		(event: "changeResult"): void;
	}

	//Prop
	const prop = defineProps<Props>();

	//Emit
	const emit = defineEmits<Emits>();

	// Methods
	function clearLocalStorage() {
		localStorage.result = JSON.stringify([]);
		emit("changeResult");
	}
</script>
<template>
	<div class="last-results">
		<div class="title">
			<b>Last Results</b>
			<button id="clear-last-results" @click="clearLocalStorage()">
				<font-awesome-icon icon="fa solid fa-eraser" />
			</button>
		</div>
		<div v-for="(l, i) in lastResults.reverse()" :key="i" class="result">
			<div class="player">{{ l.p1 }}</div>
			<div class="vs">vs</div>
			<div class="player">{{ l.p2 }}</div>
			<div class="icon">
				<font-awesome-icon :icon="'fa-regular ' + l.choice1" />
			</div>
			<div class="icon">
				<font-awesome-icon :icon="'fa-regular ' + l.choice2" />
			</div>
			<div class="message"> {{ l.message }}</div>
		</div>
	</div>
</template>
<style lang="postcss" scoped>
	.last-results {
		@apply mt-20 flex flex-col border-t pt-10 text-3xl lg:text-4xl;
	}
	.last-results > .title {
		@apply flex flex-nowrap space-x-5 mb-10 px-3 lg:px-5;
	}
	.result {
		@apply grid grid-cols-3 gap-5 border-b border-white/10 py-5 text-xl lg:text-2xl;
	}
	.result > * {
		@apply flex justify-center text-center;
	}
	.vs {
		@apply row-span-2 flex items-center;
	}
	.player {
		@apply drop-shadow-md;
	}
	.message {
		@apply col-span-full mx-auto justify-center rounded-lg border-2 px-3 py-1.5 text-center font-bold tracking-wide antialiased drop-shadow-md;
	}
	.icon {
		@apply text-4xl;
	}
</style>
