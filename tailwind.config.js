/** @type {import('tailwindcss').Config} */

//https://coolors.co/85ffc7-297373-599090-88adad-b7caca-cfd8d8-e6e6e6-39393a
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/@ionic/vue/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      white: "#E6E6E6",
      primary: "#719f9f",
      darkGreen: "#00241B",
      mint: "#65B891",
    },
    fontFamily: {
      orbitron: ["Orbitron", "sans-serif"],
      muktaMahee: ["Mukta Mahee", "sans-serif"],
    },
    fontSize: {
      "h-xl": [
        "64px",
        { lineHeight: "64px", fontWeight: "700", fontFamily: "Orbitron" },
      ], // desktop title
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
