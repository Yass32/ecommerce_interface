// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        testblue: '#00aaff'
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        avenir: ['Avenir', 'sans-serif'],
      },
      fontSize: {
        // Custom sizes
        'avenir-45': '45px',
        'avenir-14': '14px',
        'avenir-12': '12px',
        'montserrat-15': '15px',
      }
    },
  },
  plugins: [],
}
// This file is used to configure Tailwind CSS in the project.