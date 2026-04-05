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
            },
            explosiveIn: {
                "0%": { transform: "scale(0.6)", opacity: "0", filter: "blur(20px)" },
                "40%": { transform: "scale(1.1)", opacity: "1", filter: "blur(0px)" },
                "100%": { transform: "scale(1)", opacity: "1" }
            },
            slideDownFade: {
                "0%": { transform: "translateY(-30px)", opacity: "0" },
                "100%": { transform: "translateY(0)", opacity: "1" }
            },
            fadeIn: {
                "0%": { opacity: "0" },
                "100%": { opacity: "1" }
            },
            fadeOut: {
                "0%": { opacity: "1" },
                "100%": { opacity: "0" }
            },
            whiteFlash: {
                "0%": { opacity: "0" },
                "5%": { opacity: "1" },
                "100%": { opacity: "0" }
            }
        },
        animation: {
            blob1: "blob 15s infinite alternate ease-in-out",
            blob2: "blob 20s infinite alternate-reverse ease-in-out",
            blob3: "blob 18s infinite alternate ease-in-out",
            blob4: "blob 22s infinite alternate-reverse ease-in-out",
            explosiveIn: "explosiveIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
            slideDownFade: "slideDownFade 0.9s ease-out",
            spinSlow: "spin 4s linear infinite",
            "fade-in": "fadeIn 0.5s ease-out",
            "fade-out": "fadeOut 0.7s ease-in forwards",
            "white-flash": "whiteFlash 0.4s ease-out forwards"
        }
    }
  },
  plugins: [],
}
