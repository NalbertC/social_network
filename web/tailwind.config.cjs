/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx", "./index.html"],
  theme: {
    fontSize: {
      xs: 14,
      sm: 16,
      md: 18,
      lg: 20,
      xl: 24,
      "2xl": 32,
    },
    extend: {
      fontFamily: {
        sans: ["Helvetica", "Arial", "sans-serif"],
      },
      colors: {
        background: "#18181a",
        header: "#242526",
        card: "#242526",
        cardHover: "#3a3b3c",
        colorSecondary: "#3a3b3c",
        colorSecondaryHover: "#4e4f50",
        button: "#2374e1",
        textPrincipal: "#e4e6eb",
        textSecondary: "#b0b3b8",
      },
      gridTemplateRows: {
        7: "repeat(7, minmax(0,1fr))",
      },
      flex: {
        2: "2 1 0",
        3: "3 1 0",
      },
    },
  },
  plugins: [],
};
