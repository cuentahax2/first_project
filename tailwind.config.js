/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#16a34a', // verde
        secondary: '#000000', // negro
        accent: '#ffffff', // blanco
      },
    },
  },
  darkMode: 'class',
  plugins: [require('@tailwindcss/typography')],
};
