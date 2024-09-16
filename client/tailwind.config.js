/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // colours for light mode
        'text-light': '#040406',
        'background-light': '#70757d',
        'primary-light': '#0065cd',
        'secondary-light': '#9aaada',
        'accent-light': '#778fd4',
        'link-light': '#024996',
        'boton-light': '#0065cd',
        'boton-hover-light': '#004c9a',

        // colours for dark mode
        'text-dark': '#f9f9fb',
        'background-dark': '#020203',
        'primary-dark': '#465ca0',
        'secondary-dark': '#253565',
        'accent-dark': '#2b4288',
        'link-dark': '#007bff',
        'boton-dark': '#465ca0',
        'boton-hover-dark': '#2b4288',
      },
    },
  },
  plugins: [],
};
