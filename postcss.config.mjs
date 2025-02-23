/** @type {import('postcss').ProcessOptions} */
const config = {
  plugins: {
    "postcss-flexbugs-fixes": {},
    "postcss-preset-env": {},
    "@tailwindcss/postcss": {},
    cssnano: { preset: "default" },
  },
};

export default config;
