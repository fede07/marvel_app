/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#001028',
        'secondary': '#ffffff',
        'accent': '#0070f3',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'serif': ['Merryweather', 'serif'],
        'mono': ['Fir Code', 'monospace']
      },
      spacing: {
        18: '4.5rem',
      },
      borderRadius: {
        'xl': '2rem',
      },
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
