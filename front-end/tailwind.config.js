/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#2563eb',
          light: '#60a5fa',
          dark: '#1d4ed8',
        },
        sidebar: '#0f172a',
        header: '#0b1121',
      },
    },
  },
  plugins: [],
}

