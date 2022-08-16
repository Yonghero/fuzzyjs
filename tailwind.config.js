/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './core/**/*.{vue,html,jsx,tsx}',
    './fuzzy-next/**/*.{vue,html,jsx,tsx,ts}',
    './playground/**/*.{vue,html,jsx,tsx,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#0971FF',
        },
      },
    },
  },
  plugins: [],
}
