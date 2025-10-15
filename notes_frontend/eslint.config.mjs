import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";

export default [
  js.configs.recommended,
  {
    ignores: [
      "node_modules/**",
      "build/",
      "dist/",
      "*.log",
      "*.tmp",
      "*.tsbuildinfo",
      "coverage/",
      ".vscode/",
      ".idea/",
      "*.config.mjs",
    ],
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        window: "readonly",
        document: "readonly",
        localStorage: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        confirm: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      react: reactPlugin,
    },
    rules: {
      "no-undef": "off",
      "react/react-in-jsx-scope": "off",
      "no-unused-vars": ["error", { "args": "after-used", "ignoreRestSiblings": true }],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
