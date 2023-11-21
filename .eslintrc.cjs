/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
