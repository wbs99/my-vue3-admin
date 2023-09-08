import { createApp, h } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import '@svgstore'
import TDesign from 'tdesign-vue-next'
import 'tdesign-vue-next/es/style/index.css'
import './assets/stylesheets/base.scss'
import { plugin } from 'echarts-for-vue'
import * as echarts from 'echarts'
import App from './App.vue'
import { permissionDirective } from './directives/permission'
import Icon from './components/Icon.vue'
import { router } from './router'
import 'virtual:uno.css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)
app.component('Icon', Icon)
app.use(TDesign)
app.use(router)
app.use(pinia)
app.use(plugin, { echarts, h })
app.directive('permission', permissionDirective)
app.mount('#app')
