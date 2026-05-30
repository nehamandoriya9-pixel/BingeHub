export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        jose: ["Josefin Sans", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      screens: {
        xs: { max: "550px" },
        xxs: { max: "390px" },
        xss: { max: "360px" },
      },
    },
  },
  plugins: [],
};
