module.exports = {
  plugins: {
    '@tailwindcss/postcss': {
      config: './tailwind.purchase-order.config.js',
    },
    autoprefixer: {},
    'postcss-clean': {}, // For minification
  },
};