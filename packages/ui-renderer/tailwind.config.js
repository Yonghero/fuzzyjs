/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{vue,html,jsx,tsx}',
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
