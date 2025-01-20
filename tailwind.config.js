/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    container: {
      center: true,
    },   colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'Armor-Wash': '#030303',
      'white':'#ffff',
      'black': '#000',
      'Eerie-Black':'#1C1B1B',
      'orange':'#f27121',
      'red':'#EB4D4D'
    },
  },
  plugins: [],
};
