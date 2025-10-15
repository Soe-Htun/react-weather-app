/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'primary': 'linear-gradient(118.25deg, #4F80FA 1.2%, #3764D7 59.26%, #335FD1 79.2%)',
      },
      colors: {
        secondary: '#d6e4ff',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      }
    },
  },
  plugins: [],
}