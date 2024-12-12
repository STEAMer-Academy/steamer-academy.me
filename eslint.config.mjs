import pluginNext from "@next/eslint-plugin-next";
import eslintPluginPrettier from "eslint-plugin-prettier";
import tsParser from "@typescript-eslint/parser";
import ts from "@typescript-eslint/eslint-plugin";
import tailwind from "eslint-plugin-tailwindcss";
import reactPlugin from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";
import eslint from "@eslint/js";
import globals from "globals";

export default [
  ...tailwind.configs["flat/recommended"],
  eslint.configs.recommended,
  {
    name: "ESLint Config - nextjs",
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { modules: true },
        ecmaVersion: "latest",
        ecmaFeatures: {
          jsx: true,
        },
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@next/next": pluginNext,
      "next/typescript": pluginNext,
      "next/core-web-vitals": pluginNext,
      prettier: eslintPluginPrettier,
      react: reactPlugin,
      "react-hooks": hooksPlugin,
      "@typescript-eslint": ts,
    },
    files: [
      "**/*.{js,mjs,cjs,ts,tsx,jsx,,md,mdx}",
      "./*.{js,mjs,cjs,ts,tsx,jsx,md,mdx}",
    ],
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
      ...reactPlugin.configs["jsx-runtime"].rules,
      ...hooksPlugin.configs.recommended.rules,
      "prettier/prettier": "error",
      "@next/next/no-img-element": "error",
      ...ts.configs["eslint-recommended"].rules,
      ...ts.configs["recommended"].rules,
      "@typescript-eslint/return-await": 2,
    },
    ignores: [".next/*"],
  },
];
