/** @type {import('postcss').ProcessOptions} */
const config = {
	plugins: {
		"postcss-flexbugs-fixes": {},
		"postcss-preset-env": {},
		tailwindcss: {},
		autoprefixer: {},
	  "cssnano": { preset: "default" },
	},
};

export default config;
