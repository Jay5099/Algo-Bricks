/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  
  theme: {
    extend: {
      screens: {
        lg1080: '1080px', // Custom breakpoint at 1080px
      },
    },
  },
  plugins: [],
}

