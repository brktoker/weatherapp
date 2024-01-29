/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'weather-primary': '#00668A',
        'weather-secondary': '#004E71'
      }
    },
    fontFamily: {
      Poor_Story: ['Poor Story, sans-serif']
    },
    fontSize: {
      fontSize: '1.2rem'
    },
    container: {
      padding: '2rem',
      center: true
    },
    screens: {
      sm: '640px',
      md: '768px'
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
