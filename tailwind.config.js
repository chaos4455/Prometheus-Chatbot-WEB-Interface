/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'inherit',
            a: {
              color: '#10b981',
              '&:hover': {
                color: '#059669',
              },
            },
            pre: {
              backgroundColor: '#1f2937',
              color: '#e5e7eb',
              borderRadius: '0.5rem',
              padding: '1rem',
            },
            code: {
              color: '#e5e7eb',
              backgroundColor: '#374151',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
};