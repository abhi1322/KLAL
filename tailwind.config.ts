import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream:   { DEFAULT: '#FAF8F5', dark: '#F0EDE8' },
        charcoal:{ DEFAULT: '#1C1917', light: '#3D3935' },
        copper:  { DEFAULT: '#B87333', light: '#D4956A', dark: '#8B5E27' },
        warm:    { 50: '#FDF8F0', 100: '#F5ECD8', 200: '#E8D5B0' },
        stone:   { 300: '#C4B8A8', 500: '#8A7968', 700: '#4A4038' },
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
export default config;
