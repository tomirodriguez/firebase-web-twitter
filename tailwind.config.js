/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      mxl: '1106px',
      // => @media (min-width: 1106px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
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
