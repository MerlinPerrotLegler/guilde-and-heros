import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  nitro: {
    preset: 'node-server',
    // En prod le serveur lit process.env.PORT et process.env.HOST (défaut 0.0.0.0).
    // Hostinger doit injecter PORT si besoin.
  },
  modules: [],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  devtools: { enabled: true },
})
