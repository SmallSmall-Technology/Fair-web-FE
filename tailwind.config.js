/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        custom: '0px 4px 4px 0px rgba(0, 0, 0, 0.1)',
      },
      boxShadow: {
        'credit-card':
          '0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
