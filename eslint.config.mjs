// eslint.config.js
import stylistic from "@stylistic/eslint-plugin";

export default [
  {
    plugins: {
      "@stylistic": stylistic
    },
    rules: {
      "indent": ["error", 2],
      "quotes": ["error", "double"],
      "@stylistic/jsx-one-expression-per-line": ["error", { "allow": "literal" }],
      "semi": ["error", "always"],
      "arrow-parens": ["error", "always"],
    }
  }
];
