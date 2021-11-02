const floating = require("./styles/floating");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        float: "floating 20s linear infinite",
      },
      keyframes: {
        ...floating,
      },
      boxShadow: {
        "white-sm": "0 1px 2px 0 rgba(255,255,255, 0.05)",
        white:
          "0 1px 3px 0 rgba(255,255,255, 0.1), 0 1px 2px 0 rgba(255,255,255, 0.06)",
        "white-md":
          "0 4px 6px -1px rgba(255,255,255, 0.1), 0 2px 4px -1px rgba(255,255,255, 0.06)",
        "white-lg":
          "0 10px 15px -3px rgba(255,255,255, 0.1), 0 4px 6px -2px rgba(255,255,255, 0.05)",
        "white-xl":
          "0 20px 25px -5px rgba(255,255,255, 0.1), 0 10px 10px -5px rgba(255,255,255, 0.04)",
        "white-2xl": "0 25px 50px -12px rgba(255,255,255, 0.25)",
        "white-3xl": "0 35px 60px -15px rgba(255,255,255, 0.3)",
        "white-inner": "inset 0 2px 4px 0 rgba(255,255,255, 0.06)",
      },
      dropShadow: {
        "white-sm": "0 1px 1px rgba(255,255,255, 0.05)",
        white: "0 1px 2px rgba(255,255,255, 0.1)",
        "white-md": "0 4px 3px rgba(255,255,255, 0.07)",
        "white-lg": "0 10px 8px rgba(255,255,255, 0.04)",
        "white-xl": "0 20px 13px rgba(255,255,255, 0.03)",
        "white-2xl": "0 25px 25px rgba(255,255,255, 0.15)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
