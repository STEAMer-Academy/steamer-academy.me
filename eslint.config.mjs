import pluginNext from "@next/eslint-plugin-next";
import eslintPluginPrettier from "eslint-plugin-prettier";
import parser from "@typescript-eslint/parser";

export default [
  {
    name: "ESLint Config - nextjs",
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@next/next": pluginNext,
      prettier: eslintPluginPrettier,
    },
    files: [
      "**/*.{js,mjs,cjs,ts,tsx,jsx,json,md,mdx}", // Matches files in subdirectories
      "./*.{js,mjs,cjs,ts,tsx,jsx,json,md,mdx}", // Matches files in the root directory
    ],
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
      "prettier/prettier": "error",
    },
  },
];
