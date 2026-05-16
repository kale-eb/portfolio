import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"General Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: {
          50: '#FBF7EE',
          100: '#F5EFE0',
          200: '#ECE3CE',
          300: '#DDD0B5',
        },
        sky: {
          50: '#EEF3F8',
          100: '#DCE5EE',
          200: '#C2D0DE',
          300: '#A4B6C8',
          400: '#7E92A8',
          500: '#5C7187',
          600: '#475B70',
        },
        ink: {
          300: '#6B7280',
          500: '#4B5563',
          700: '#2A3340',
          900: '#1F2937',
        },
        accent: '#C99B6E',
      },
    },
  },
  plugins: [],
};

export default config;
