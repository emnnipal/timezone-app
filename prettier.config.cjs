/** @type {import("prettier").Config} */
module.exports = {
  singleQuote: true,
  jsxSingleQuote: false,
  tabWidth: 2,
  trailingComma: 'es5',
  printWidth: 100,
  semi: true,
  arrowParens: 'always',
  endOfLine: 'auto',
  plugins: ['prettier-plugin-svelte', require('prettier-plugin-tailwindcss')],
  pluginSearchDirs: ['.'],
  overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
};
