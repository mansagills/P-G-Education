import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f3f8f6',
          100: '#dcefe9',
          500: '#1f6f5d',
          700: '#175244',
          900: '#0d3028'
        }
      }
    }
  },
  plugins: []
};

export default config;
