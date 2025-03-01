// tailwind.config.js
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    theme: {
      extend: {
        colors: {
          primary: '#1E3A8A', // Custom primary color
          secondary: '#F59E0B', // Custom secondary color
          accent: '#10B981', // Custom accent color
        },
        fontFamily: {
          poppins: ['Poppins', 'sans-serif'],
        },
      },
    },
    plugins: [],
  };