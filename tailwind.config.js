/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#1D9BF0',
        'primary-white': '#F7F9F9',
        'secondary-text': '#8b98a5',
        'hover-white': '#E7E9EA1A',
        'main-dark': '#15202B',
        blur: '#15202bbf',
        border: '#38444d',
        error: '#F4212E',
        search: '#263340',
        'card-dark': '#1E2732',
        'follow-black': '#0F1419',
        'follow-white': '#EFF3F4',
      },
      spacing: {
        header: '275px',
        'main-content': '600px',
        aside: '322px',
        18: '72px',
      },
      fontSize: {
        xs: '.875rem',
        sm: '.9375rem',
      },
    },
  },
  plugins: [],
};
