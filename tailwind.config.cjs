/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.tsx', './index.html'],
    theme: {
        extend: {
            colors: {
                bodyBackground: '#EEE',
                primaryDark: '#002782',
                primaryMedium: '#183695',
                primaryLight: '#3046a7',
                primaryExtraLight: '#4855ba',
                secondaryDark: '#006d00',
                secondaryMedium: '#069010',
                secondaryLight: '#0ca31f',
                secondaryExtraLight: '#12b52f',
            },
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
                reemKufi: ['Reem Kufi Fun', 'sans-serif'],
            },
            maxHeight: {
                '9/10': '90%',
            },
        },
    },
    plugins: [],
};
