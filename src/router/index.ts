import { createRouter, createWebHistory } from "vue-router";

import GamePage from "../pages/GamePage.vue";
import HomePage from "../pages/HomePage.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{ path: "/", name: "home", component: HomePage },
		{ path: "/game", name: "game", component: GamePage },
		// Default
		{ path: "/:any(.*)*", redirect: () => ({ name: "home" }) },
	],
});

export default router;
