import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#d9ebff',
          200: '#b7d7ff',
          300: '#86bbff',
          400: '#569bff',
          500: '#2f7aff',
          600: '#185fff',
          700: '#144ae6',
          800: '#153db3',
          900: '#143588',
        },
      },
      boxShadow: {
        glow: '0 0 40px rgba(47,122,255,0.35)',
      },
      backgroundImage: {
        'grid-radial': 'radial-gradient(circle at 20% 10%, rgba(47,122,255,0.25), transparent 35%), radial-gradient(circle at 80% 30%, rgba(20,53,136,0.25), transparent 40%)',
      },
    },
  },
  plugins: [],
} satisfies Config;
