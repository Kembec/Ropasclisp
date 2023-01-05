<script setup lang="ts"></script>
<template>
	<nav>
		<RouterLink to="/">Ropasclisp</RouterLink>
	</nav>
</template>
<style lang="postcss" scoped>
	nav {
		@apply flex w-full flex-nowrap p-5 lg:px-10;
	}
	nav > a {
		@apply border-2 border-white px-5 pt-1.5 pb-3 text-4xl font-bold drop-shadow-md;
	}
</style>
