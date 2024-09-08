/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amethyst: '#A58E9C',
        raisin: '#2B1819',
        brown: '#8D6756',
        lightbrown: '#987666',
        gray: '#AF9C99',
        vanilla: '#DEC4A7',
        darkvanilla: '#dbbd9a',
      }
    },
  },
  plugins: [],
}
