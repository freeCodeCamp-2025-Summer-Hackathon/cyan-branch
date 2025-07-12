// Run this command to generate base config and vs code settings:
// pnpm dlx @antfu/eslint-config@latest

import antfu from "@antfu/eslint-config";
import nextPlugin from "@next/eslint-plugin-next";

export default antfu({
  type: "app",
  react: true,

  // Can enable/disable formatters with e.g. { css: true, html: false }
  formatters: true,

  // ESLint Stylistic rules
  stylistic: {
    indent: 2,
    semi: true,
    quotes: "double",
  },

  // Files to ignore when linting
  ignores: ["plan.md"],
}, {
  // Plugins to include for linting process
  plugins: {
    "@next/next": nextPlugin,
  },

  // Extension of default config rules
  rules: {
    ...nextPlugin.configs.recommended.rules,
    ...nextPlugin.configs["core-web-vitals"].rules,
    "style/jsx-pascal-case": ["error"],
    "no-console": ["warn"],
    "antfu/no-top-level-await": ["off"],
    "node/prefer-global/process": ["off"],
    "node/no-process-env": ["error"],
    'react/prefer-destructuring-assignment': 'off',
    // "perfectionist/sort-imports": ["error", {
    //   tsconfigRootDir: '.',
    // }],
    // "unicorn/filename-case": ["error", {
    //   case: "pascalCase",
    //   ignore: ["README.md"],
    // }],
  },
});
