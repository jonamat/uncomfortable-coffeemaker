module.exports = {
  root: true,
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 8,
        ecmaFeatures: {
          jsx: true
        },
      },
      settings: { react: { version: 'detect' } },
      env: {
        browser: true,
        node: true,
        es6: true,
      },
      plugins: [
        'unused-imports', 'prettier', 'react', 'jsx-a11y',
      ],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:prettier/recommended',
      ],
      rules: {
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        'unused-imports/no-unused-imports': 'warn',
        "@typescript-eslint/no-non-null-assertion": "off",
        "unused-imports/no-unused-vars": [
          "warn",
          { "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
        ],
        'prettier/prettier': ['warn', {}, { usePrettierrc: true }],
        '@typescript-eslint/no-unused-vars': 'off', // Delegate to unused-imports
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off'
      },
    },
  ],

  ignorePatterns: ['node_modules/*', 'build/*', 'webpack/*', '.prettierrc.js'],
}