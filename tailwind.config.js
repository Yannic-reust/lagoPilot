/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/@ionic/vue/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    /* colors: {
      white: "#FFFFFF",
      lightGray: "#F8F8F8",
      black: "#000000",
      red: "#ff0000",
      green: "#5dd527",
      yellow: "#eddd00",
      blue: "#1285ed",
    },*/
    fontFamily: {
      orbitron: ["Orbitron", "sans-serif"],
      muktaMahee: ["Mukta Mahee", "sans-serif"],
    },
    fontSize: {
      "h-l": [
        "32px",
        { lineHeight: "64px", fontWeight: "700", fontFamily: "Orbitron" },
      ], // desktop title
      "h-md": [
        "26px",
        { lineHeight: "45px", fontWeight: "700", fontFamily: "Orbitron" },
      ], // desktop sub title
      "h-sm": [
        "22px",
        { lineHeight: "35px", fontWeight: "700", fontFamily: "Orbitron" },
      ], // desktop sub title
      "h-xs": [
        "18px",
        { lineHeight: "35px", fontWeight: "400", fontFamily: "Orbitron" },
      ], // desktop sub title

      "p-lg": [
        "16px",
        { lineHeight: "26px", fontWeight: "400", fontFamily: "Mukta Mahee" },
      ], // desktop text
      "p-sm": [
        "12px",
        { lineHeight: "24px", fontWeight: "400", fontFamily: "Mukta Mahee" },
      ], // mobile text
    },
    extend: {
      fontFamily: { sans: ["Mukta Mahee"] },
    },
  },
  plugins: [],
};
