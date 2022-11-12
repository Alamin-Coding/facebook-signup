/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        'xs': '320px',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        'primary': '#1877F2',
        'secondary': '#36A420',
        'borderColor': '#D9D9D9',
      },
    },
  },
  plugins: [],
}
