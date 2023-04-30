// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
      mono: ['Jetbrains Mono', 'monospace']
    },
    extend: {
      boxShadow: {
        glow: "0 0 15px rgba(255, 255, 255, 0.5)",
      },
      transitionProperty: {
        width: "width",
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ["hover", "group-hover"],
    },
  },
  plugins: [],
};
