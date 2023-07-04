/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/**/*.tsx"],
  theme: {
    extend: {
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
    },

  },
  plugins: [],
};
