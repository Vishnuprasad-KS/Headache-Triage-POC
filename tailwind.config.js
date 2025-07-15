/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'red-flag-systemic': '#dc2626',
        'red-flag-neurological': '#ea580c',
        'red-flag-neoplasm': '#7c2d12',
        'red-flag-onset': '#991b1b',
        'red-flag-older': '#b45309',
        'red-flag-pattern': '#c2410c',
        'red-flag-papilledema': '#92400e',
        'red-flag-low': '#16a34a',
      }
    },
  },
  plugins: [],
}