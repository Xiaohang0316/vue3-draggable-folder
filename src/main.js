import { createApp } from "vue";
import App from "./App.vue";
import { DraggablePlugin } from "./draggable";
import "./main.css";

const app = createApp(App);

app.use(DraggablePlugin);

app.mount("#app");
