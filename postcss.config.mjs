/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "postcss-flexbugs-fixes": {},
    "postcss-preset-env": {},
    tailwindcss: {},
    autoprefixer: {},
    cssnano: { preset: "default" },
  },
};

export default config;
