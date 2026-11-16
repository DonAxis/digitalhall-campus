/** @type {import('tailwindcss').Config} */
// Colores de la marca HALL (los mismos que la Biblioteca Digital).
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        hall: {
          navy: '#1a2744',
          gold: '#c9a84c',
          cream: '#f5f0e8',
          dark: '#0d1424',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
}
