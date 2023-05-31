/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-img': "url('/public/assets/hero-image.jpg')",
      }
    },
  },
  plugins: [],
}
