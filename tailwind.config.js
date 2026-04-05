/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
        fontFamily: {
            sans: ['Rubik', 'sans-serif'],
        },
        colors: {
            raisin: '#262626',
            snow: '#faf9f7',
            saffron: '#f4c82b',
            carmine: '#f04e3a',
            verdigris: '#3bb9ab',
            spanish: '#086fb6',
            darker: '#1a1a1a'
        },
        keyframes: {
            blob: {
                "0%": { transform: "translate(0px, 0px) scale(1)" },
                "33%": { transform: "translate(30px, -50px) scale(1.1)" },
                "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
                "100%": { transform: "translate(0px, 0px) scale(1)" }
            }
        },
        animation: {
            blob1: "blob 15s infinite alternate ease-in-out",
            blob2: "blob 20s infinite alternate-reverse ease-in-out",
            blob3: "blob 18s infinite alternate ease-in-out",
            blob4: "blob 22s infinite alternate-reverse ease-in-out"
        }
    }
  },
  plugins: [],
}
