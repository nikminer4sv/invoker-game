/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dota-blue': '#1a365d',
        'dota-orange': '#ed8936',
        'dota-red': '#e53e3e',
        'dota-green': '#38a169',
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 1.5s infinite',
      }
    },
  },
  plugins: [],
} 