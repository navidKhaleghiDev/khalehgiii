/** @type {import('tailwindcss').Config} */
import fontSize from './config/tailwind/fontSize.json';
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      gridTemplateColumns: {
        sidebar: '300px auto', //for sidebar layout
        'sidebar-collapsed': '64px auto', //for collapsed sidebar layout
      },
    },
    fontSize,
    fontFamily: {
      on: ['on', 'sans-serif'],
      sans: ['ui-sans-serif', 'system-ui'],
      serif: ['ui-serif', 'Georgia'],
    },
  },
  plugins: [require('autoprefixer')],
};
