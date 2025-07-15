/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'red-flag': {
          'systemic': '#dc2626', // red-600
          'neurological': '#ea580c', // orange-600
          'neoplasm': '#7c2d12', // amber-800
          'onset': '#991b1b', // red-800
          'older': '#b45309', // amber-700
          'pattern': '#c2410c', // orange-700
          'papilledema': '#92400e', // amber-600
          'low': '#16a34a', // green-600
        }
      }
    },
  },
  plugins: [],
}