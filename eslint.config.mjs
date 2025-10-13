import { fixupPluginRules } from '@eslint/compat';
import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginImport from 'eslint-plugin-import';
import importAlias from 'eslint-plugin-import-alias';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default defineConfig([
  globalIgnores(['**/dist']),
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    ignores: ['node_modules/', 'dist/'],

    languageOptions: {
      globals: {
        ...globals.node,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    plugins: {
      import: fixupPluginRules(eslintPluginImport),
      'import-alias': importAlias,
    },

    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts'],
      },

      'import/resolver': {
        typescript: {
          typescript: true,
          node: true,
        },
      },
    },

    rules: {
      'import/no-unresolved': 'error',
      'import/no-relative-packages': 'error',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'sibling',
            'parent',
            'object',
            'type',
            'index',
          ],

          alphabetize: {
            order: 'asc',
            caseInsensitive: false,
          },

          'newlines-between': 'always',
        },
      ],
      'import-alias/import-alias': ['error'],
      // import-alias と被るルールの無効化
      'no-restricted-imports': 'off',
      'import/no-relative-parent-imports': 'off',
    },
  },
  eslintConfigPrettier,
]);
