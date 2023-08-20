/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Lato", "sans-serif"],
      heading: ["Alegreya", "serif"],
    },
    extend: {
      screens: {
        sm: "480px",
      },
    },
  },
  plugins: [],
};
