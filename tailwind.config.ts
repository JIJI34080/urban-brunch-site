import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        beige: '#E7D9C9',
        cream: '#F6EFE9',
        terracotta: '#CB7A5C',
        wood: '#8A5A44',
        brand: '#111111'
      },
      fontFamily: {
        sans: ['"Inter"', ...fontFamily.sans]
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};

export default config;
