/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      "msm": { max: "500px" },
      'mmd':{max:'800px'},
      'mlg':{max:'1024px'},
    },
    extend: {},
  },
  plugins: [],
};

