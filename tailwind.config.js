/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#1D9BF0',
        'hover-blue': '#1D9BF01A',
        'primary-white': '#E7E9EA',
        'hover-white': '#E7E9EA1A',
      },
    },
  },
  plugins: [],
};
