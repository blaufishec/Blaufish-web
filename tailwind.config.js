/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blaufish: {
          dark: '#0A0F1D',
          navy: '#121B2D',
          card: '#1E293B',
          accent: '#1D4ED8',
          gold: '#C5A059'
        }
      },
      fontFamily: {
        sans: ['"TT Norms Pro"', '"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      maxWidth: {
        'content': '88rem',
      }
    },
  },
  plugins: [],
}
