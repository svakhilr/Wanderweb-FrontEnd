/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily:{
        'ga-maamli-regular':'"Ga Maamli", sans-serif;',
        'cursive':'"Caveat", cursive;',
        'metamise':'"Matemasie", sans-serif;'
      }
    },
  },
  plugins: [],
}