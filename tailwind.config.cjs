/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.jsx", "./index.html"],
    theme: {
        extend: {
            colors: {
                bodyBackground: "#EEE",
                primaryDark: "#002782",
                primaryMedium: "#183695",
                primaryLight: "#3046a7",
                primaryExtraLight: "#4855ba",
                secondaryDark: "#007d00",
                secondaryMedium: "#069010",
                secondaryLight: "#0ca31f",
                secondaryExtraLight: "#12b52f",
            },
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
            },
        },
    },
    plugins: [],
};
