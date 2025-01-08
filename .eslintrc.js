module.exports = {
  root: true,
  extends: ["custom"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  parserOptions: {
    project: ["./tsconfig.json"],
  },
};