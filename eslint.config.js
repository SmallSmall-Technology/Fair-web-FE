import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // Your custom config
  {
    files: ['**/*.{js,mjs,cjs,jsx,}'],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      react: pluginReact,
    },
    rules: {
      // Disable react-in-jsx-scope rule
      'react/react-in-jsx-scope': 'off',
    },
  },

  // Spread recommended configs into the array
  ...pluginJs.configs.recommended,
  ...pluginReact.configs.flat.recommended,
];
