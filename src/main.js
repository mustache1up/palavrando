import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";

import { configureFirebase } from "./configureFirebase.js";

configureFirebase();

createApp(App).mount("#app");
