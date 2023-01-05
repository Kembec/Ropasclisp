import "./assets/main.css";

import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
const app = createApp(App);

// Fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHandLizard, faHandPaper, faHandPeace, faHandRock, faHandScissors, faHandSpock } from '@fortawesome/free-regular-svg-icons';
import { faEraser } from '@fortawesome/free-solid-svg-icons';
library.add(faHandRock, faHandPaper, faHandScissors, faHandLizard, faHandSpock, faHandPeace, faEraser)

// Components
app.component('font-awesome-icon', FontAwesomeIcon);

// Use
app.use(router);

// Mount
app.mount("#app");
