<script lang="ts" setup>
	import Navbar from "./shared/components/NavbarComponent.vue";
</script>
<template>
	<Navbar />
	<main>
		<RouterView />
	</main>
</template>
<style lang="postcss" scoped>
	main {
		@apply my-auto flex flex-col;
	}
</style>
