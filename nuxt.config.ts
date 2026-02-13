import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  nitro: {
    preset: 'node-server',
  },
  modules: [],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  devtools: { enabled: true },
})
