module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin"],
  extends: [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "next/core-web-vitals",
    "prettier",
    "plugin:@typescript-eslint/recommended",
  ],
  root: true,
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "import/prefer-default-export": "off",
    "import/no-default-export": "off",
    "@typescript-eslint/explicit-module-boundary-types": "error",
    "react/function-component-definition": "off",
  },
};
