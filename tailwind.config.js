/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        'card': '240px'
      },
      height: {
        'card': '320px'
      },
      maxWidth: {
        'page': '800px',
        'search': '400px'
      }
    },
  },
  plugins: [],
};
