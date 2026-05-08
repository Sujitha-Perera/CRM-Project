/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f5f0ff",
          100: "#ece3ff",
          200: "#dbc7ff",
          300: "#c29dff",
          400: "#a76cf7",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
        },
      },
      boxShadow: {
        soft: "0 20px 45px rgba(109, 40, 217, 0.14)",
      },
      backgroundImage: {
        "brand-blend":
          "linear-gradient(135deg, rgba(109,40,217,0.14), rgba(168,85,247,0.08), rgba(244,114,182,0.08))",
      },
    },
  },
  plugins: [],
};
