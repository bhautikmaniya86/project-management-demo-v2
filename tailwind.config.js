/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        purple: {
          100: '#540474',
          200: '#3c0054',
          300: '#480663',
          400: '#6B048C',
          500: '#d59eea',
        },
        pink: { 100: '#FF7170', 200: '#ff9c9b' },
        gray: {
          100: '#d2d2d2',
        },
      },
    },
  },
  plugins: [],
};
