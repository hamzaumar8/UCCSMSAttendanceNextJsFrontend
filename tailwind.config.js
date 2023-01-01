/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#1A3A9E",
                secondary: "#59FFA0",
                "primary-accent": "#E9EDFB",
                "secondary-accent": "#CCFFE2",
                "gray-text": "#8D9091",
                "black-text": "#1E2019",
                danger: "#E4572E",
            },
            fontFamily: {
                sans: ["Nunito", ...defaultTheme.fontFamily.sans],
            },
        },
    },
    variants: {
        extend: {
            opacity: ["disabled"],
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
