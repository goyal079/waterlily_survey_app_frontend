/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        fontFamily: {
          sans: ["Fredoka", "system-ui", "sans-serif"],
        },
        colors: {
          primary: {
            DEFAULT: '#7755CC',
            hover: '#6644bb', // slightly darker for hover states
            light: '#9177d8', // lighter shade for other UI elements
          },
        },
      },
    },
    plugins: [],
  };