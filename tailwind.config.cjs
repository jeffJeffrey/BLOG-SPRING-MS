module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  theme: {
    extend: {
      colors: {
        green: {
          600: '#16a34a', // Vibrant green for text-green-600
          700: '#15803d', // Darker green for hover states
          800: '#166534', // Dark green for backgrounds
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
