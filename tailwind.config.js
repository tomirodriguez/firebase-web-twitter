/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#1D9BF0',
        'hover-blue': '#1D9BF01A',
        'primary-white': '#F7F9F9',
        'secondary-text': '#8b98a5',
        'hover-white': '#E7E9EA1A',
        'main-dark': '#15202B',
        blur: '#15202bbf',
        border: '#38444d',
        error: '#F4212E',
      },
      spacing: {
        header: '275px',
        'main-content': '600px',
      },
    },
  },
  plugins: [],
};
