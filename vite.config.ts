import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      components: './src/components',
      config: './src/config',
      pages: './src/pages',
      router: './src/router',
      types: './src/types',
    },
  },
  plugins: [vue()],
})
