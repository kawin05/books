/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          dark: '#1A1C20',
          deeper: '#131418',
        },
        accent: {
          rust: '#C85D4E',
          amber: '#E8B85C',
        },
        text: {
          primary: '#F0EBE0',
          secondary: 'rgba(240,235,224,0.7)',
          muted: 'rgba(240,235,224,0.4)',
        },
        border: {
          subtle: 'rgba(240,235,224,0.06)',
        },
      },
      fontFamily: {
        display: ['Kanit', 'sans-serif'],
        body: ['Lexend', 'sans-serif'],
      },
      backgroundImage: {
        'page-gradient': 'linear-gradient(165deg, #1A1C20 0%, #131418 100%)',
        'accent-gradient': 'linear-gradient(90deg, #C85D4E, #E8B85C)',
      },
    },
  },
  plugins: [],
}
