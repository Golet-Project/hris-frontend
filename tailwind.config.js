/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  // important: "#_next ",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#00B4BD",
        "dodger-blue": "#01B2FD",
        mischka: "#E0DEE4",
        manatee: "#F5F5F5",
        tundora: "#404040",
      },
      darkMode: false,
    },
    darkMode: false,
  },
  plugins: [],
  darkMode: "class",
}
