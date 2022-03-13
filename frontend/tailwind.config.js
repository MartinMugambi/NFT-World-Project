module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': 'Poppins, sans-serif'
      }
    },
    screens: {
      sm: {max: "639px"},
      // => @media(max-width: 639px)
      md: {max: "767px"},
      // => @media(max-width: 768px)
      lg: {max: "1023px"},

      xl: {max: "1279px"}
    }
  },
  plugins: [],
}
