import { createApp } from 'vue'
import App from './App.vue'
import { router } from "./router";
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Icon from "./components/Icon.vue";
import '@svgstore';
import TDesign from 'tdesign-vue-next';
import 'tdesign-vue-next/es/style/index.css';
import './assets/stylesheets/base.scss'
import { permissionDirective } from './directives/permission';


const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)
app.component("Icon", Icon);
app.use(TDesign);
app.use(router)
app.use(pinia)
app.directive("permission", permissionDirective);
app.mount('#app')
