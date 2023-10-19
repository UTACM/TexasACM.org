module.exports = {
  plugins: {
    autoprefixer: {},
    "@unocss/postcss": {
      content: ["{app,components}/*.{ts,tsx}"],
    },
  },
}
