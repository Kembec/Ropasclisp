<script setup lang="ts">
	import { ref, onMounted } from "vue";
	import type { Choice } from "../../constants/ChoiceEnum";

	export interface Props {
		message: string;
		p1Choice: Choice;
		p2Choice?: Choice;
	}
	export interface Emits {
		(event: "close"): void;
	}
	// Props
	const prop = defineProps<Props>();
	// Emits
	const emit = defineEmits<Emits>();

	// Data
	const contentElement = ref<HTMLDivElement | null>(null);

	// Mounted
	onMounted(() => {
		runContentElement();
	});

	// Methods
	function runContentElement(): void {
		 // select the .content element and set it to contentElement
		contentElement.value = document.querySelector(".content");
		 // if contentElement and its parent element exist
		if (contentElement.value && contentElement.value.parentElement) {
			// add a click event listener to the parent element that runs the clickOutside function
			contentElement.value.parentElement.addEventListener("click", clickOutside); 
		}
	}
	function clickOutside(event: MouseEvent): void { // clickOutside function runs when the parent element is clicked
		if (!contentElement.value?.contains(event.target as Node)) { // if the click was not on the contentElement
			return emit("close");
		}
	}
</script>
<template>
	<section id="result">
		<div class="content">
			<div class="p1">
				<font-awesome-icon :icon="'fa-regular ' + p1Choice" />
			</div>
			<div class="vs">VS</div>
			<div class="p2">
				<font-awesome-icon :icon="'fa-regular ' + (p2Choice ?? 'fa-hand-peace')" />
			</div>
			<div class="message">{{ message }}</div>
		</div>
	</section>
</template>
<style lang="postcss" scoped>
	section {
		@apply fixed top-0 left-0 z-50 h-screen w-screen bg-black/50;
	}
	.content {
		@apply absolute left-1/2 top-1/2 grid min-w-max -translate-x-1/2 -translate-y-1/2 grid-cols-3 gap-5 rounded-lg bg-white p-10 text-slate-900;
	}
	.content > div {
		@apply flex justify-center;
	}
	.content > .p1,
	.content > .p2 {
		@apply text-4xl lg:text-6xl;
	}
	.content > .vs {
		@apply items-center text-2xl lg:text-4xl;
	}
	.message {
		@apply col-span-full text-xl lg:text-3xl;
	}
</style>
