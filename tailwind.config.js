/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './packages/layout-provider/**/*.{vue,js,ts,jsx,tsx}',
    './playground/**/*.{vue,js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
