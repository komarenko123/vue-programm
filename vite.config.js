import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: true, // чтобы приложение было доступно в локальной сети
    port: 3000  // можно указать любой свободный порт
  }
})