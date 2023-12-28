/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Noto Sans", "sans-serif"],
      },
      colors: {
        primary: "#05523b",
        "primary-content": "#61f5c9",
        "primary-dark": "#022218",
        "primary-light": "#08825e",

        secondary: "#140552",
        "secondary-content": "#7e61f5",
        "secondary-dark": "#080222",
        "secondary-light": "#200882",

        background: "#151e1b",
        foreground: "#202d29",
        border: "#354b44",

        copy: "#fbfcfb",
        "copy-light": "#d2dfdb",
        "copy-lighter": "#96b5ac",

        success: "#055205",
        warning: "#525205",
        error: "#520505",

        "success-content": "#61f561",
        "warning-content": "#f5f561",
        "error-content": "#f56161",
      },
    },
  },
  plugins: [],
};
