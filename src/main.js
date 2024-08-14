//import './assets/main.scss'
import './assets/compiledSass.scss'
import './assets/uicons-regular-rounded.css'


import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from "./router";

const app = createApp(App)
//app.use(createPinia())
//app.mount('#app')

app.use(router).mount("#app");
