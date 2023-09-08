import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import UnoCSS from 'unocss/vite'
import { svgstore } from './src/vite_plugins/svgstore'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgstore(),
    UnoCSS(),
  ],
})
