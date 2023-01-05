<script lang="ts" setup>
	import { defineAsyncComponent, ref, computed } from "vue";
	import type Result from "./Game/interfaces/ResultInterface";
	const StartGame = defineAsyncComponent(() => import("./Game/components/StartGameComponent.vue"));
	const PlayGame = defineAsyncComponent(() => import("./Game/components/PlayGameComponent.vue"));
	const LastResults = defineAsyncComponent(() => import("./Game/components/LastResultsComponent.vue"));

	// Data
	const component = ref<string>("StartGame");
	const players = ref<1 | 2>(1);
	const result = ref<string | null>(localStorage.result || "");

	// Computed
	const lastResults = computed<Result[]>(() => {
		if (!result.value) {
			return false;
		}
		return JSON.parse(result.value);
	});

	// Methods
	function selectPlayers(e: 1 | 2): void {
		players.value = e;
		component.value = "PlayGame";
	}
	function changeResult() : void {
		result.value = localStorage.result
	}
</script>
<template>
	<section id="game">
		<StartGame v-if="component == 'StartGame'" @selectPlayers="selectPlayers" />
		<PlayGame v-else-if="component == 'PlayGame'" :players="players" @changeResult="changeResult" @selectPlayers="component = 'StartGame'"/>
		<LastResults v-if="lastResults" :lastResults="lastResults" @changeResult="changeResult" />
	</section>
</template>
<style lang="postcss" scoped>
	#game {
		@apply flex flex-col px-5 pt-5 pb-16 lg:px-[10vw] lg:pt-10 xl:px-[15vw];
	}
</style>
