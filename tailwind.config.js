/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#e22454",
      },
      boxShadow: {
        "3xl": "0 .8rem 1.5rem -8px #e22454",
      },
      keyframes: {
        spinner: {
          "0%, 100%": { transform: "rotateY(0)" },
          "50%": { transform: "rotateY(-360deg)" },
        },
        floating: {
          "0%,100%": { transform: "translate(0,  200px) rotate(0)" },
          "50%": {
            transform: "translate(0, -200px) rotate(-360deg)",
          },
        },
      },
    },
  },
  plugins: [],
};

