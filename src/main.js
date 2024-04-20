import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//Creamos instancia de la app
const app = createApp(App);
//Usamos el store en el app
app.use(store);
//Usamos el router en el app
app.use(router);
//Montamos la app y la servimos
app.mount("#app");
