/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textColor: {
        black: "#000000", // You can customize the HEX color code here
      },
      backgroundSize: {
        "size-100": "100% 100%",
        "size-200": "200% 200%",
      },
      backgroundPosition: {
        "pos-0": "0% 0%",
        "pos-100": "100% 100%",
      },
    },
    fontFamily: {
      // Roboto
      roboto: ["Roboto", "sans-serif"],
      "roboto-black": ["Roboto-Black", "sans-serif"], //@RifkyA911 custom
      "roboto-bold": ["Roboto-Bold", "sans-serif"],
      "roboto-italic": ["Roboto-Italic", "sans-serif"],
      "roboto-light": ["Roboto-Light", "sans-serif"],
      "roboto-medium": ["Roboto-Medium", "sans-serif"],
      "roboto-medium-italic": ["Roboto-MediumItalic", "sans-serif"],
      "roboto-regular": ["Roboto-Regular", "sans-serif"],
      "roboto-thin": ["Roboto-Thin", "sans-serif"],
      "roboto-black-italic": ["Roboto-BlackItalic", "sans-serif"],
      "roboto-bold-italic": ["Roboto-BoldItalic", "sans-serif"],
      "roboto-light-italic": ["Roboto-LightItalic", "sans-serif"],
      "roboto-thin-italic": ["Roboto-ThinItalic", "sans-serif"],
      // Poppins
      poppins: ["Poppins", "sans-serif"],
      "poppins-black": ["Poppins-Black", "sans-serif"], //@RifkyA911 custom
      "poppins-bold": ["Poppins-Bold", "sans-serif"],
      "poppins-extra-bold": ["Poppins-ExtraBold", "sans-serif"],
      "poppins-extra-light": ["Poppins-ExtraLight", "sans-serif"],
      "poppins-italic": ["Poppins-Italic", "sans-serif"],
      "poppins-light": ["Poppins-Light", "sans-serif"],
      "poppins-medium": ["Poppins-Medium", "sans-serif"],
      "poppins-medium-italic": ["Poppins-MediumItalic", "sans-serif"],
      "poppins-regular": ["Poppins-Regular", "sans-serif"],
      "poppins-semi-bold": ["Poppins-SemiBold", "sans-serif"],
      "poppins-semi-italic": ["Poppins-SemiItalic", "sans-serif"],
      "poppins-thin": ["Poppins-Thin", "sans-serif"],
      "poppins-black-italic": ["Poppins-BlackItalic", "sans-serif"],
      "poppins-bold-italic": ["Poppins-BoldItalic", "sans-serif"],
      "poppins-light-italic": ["Poppins-LightItalic", "sans-serif"],
      "poppins-thin-italic": ["Poppins-ThinItalic", "sans-serif"],
    },
  },
  plugins: [
    require("@tailwindcss/forms")({ strategy: "class" }),
    "prettier-plugin-tailwindcss",
    require("daisyui"),
    // my custom
    plugin(function ({ addComponents }) {
      addComponents({
        ".dashboard-badge-percentage": {
          padding: ".5rem 1rem",
        },
      });
    }),
  ],
  // daisyUI config (optional - here are the default values)
  daisyui: {
    themes: false, // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "light", // name of one of the included themes for dark mode
    base: false, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  },
};
