import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#171512',
          800: '#2B2823',
          600: '#5D564B',
        },
        paper: {
          50: '#FAF8F3',
          100: '#F3EFE6',
        },
        brass: {
          500: '#9B6A38',
        },
        moss: {
          600: '#58715B',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        page: '0 24px 80px rgba(23, 21, 18, 0.12)',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config;
