import { createApp } from 'vue'
import App from './App.vue'
import { router } from "./router";
import { createPinia } from 'pinia'
import Icon from "./components/Icon.vue";
import '@svgstore';
import TDesign from 'tdesign-vue-next';
import 'tdesign-vue-next/es/style/index.css';


const pinia = createPinia()
const app = createApp(App)
app.component("Icon", Icon);
app.use(TDesign);
app.use(router)
app.use(pinia)
app.mount('#app')
