/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bgColor: "#f5f5f5",
        primary: "#003d66",
        secondary: "#336485",
        textColor: "#333333",
        "cta-bg-color": "#668ba3",
        tertiary: "#012813",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
