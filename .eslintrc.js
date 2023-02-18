module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ["eslint:recommended", "prettier"],
  ignorePatterns: ["src/tests/*.js"],
  parserOptions: {
    ecmaVersion: 2020,
  },
};
