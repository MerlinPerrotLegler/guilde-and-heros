import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
  ],
  // Tailwind CSS 4 : personnalisation additionnelle dans assets/css/main.css avec @theme
} satisfies Config
