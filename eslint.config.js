import pluginJs from '@eslint/js';
import globals from 'globals';
import tsEslint from 'typescript-eslint';
import unusedImports from 'eslint-plugin-unused-imports';
import stylistic from '@stylistic/eslint-plugin';

export default tsEslint.config(
    pluginJs.configs.recommended,
    ...tsEslint.configs.recommended,
    {
        name: 'app/files-to-ignore',
        ignores: [
            '**/dist/**',
            '**/dist-ssr/**',
            '**/coverage/**'
        ],
    },
    {
        name: 'app/files-to-lint',
        files: ['**/*.{ts,mts,tsx}'],
    },
    {
        name: 'app/common-config',
        files: ['**/*.{ts,mts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.node,
        },
    },

    {
        name: 'custom-rules',
        plugins: {
            'unused-imports': unusedImports,
            'stylistic': stylistic,
        },
        rules: {
            'indent': [
                2,
                4,
                { 'SwitchCase': 1 }
            ],
            'semi': [2, 'always'],
            'comma-spacing': [2,
                {
                    'before': false,
                    'after': true
                }],
            '@typescript-eslint/consistent-type-imports': 2,
            '@typescript-eslint/no-explicit-any': 1,
            'linebreak-style': [2, 'unix'],
            'quotes': [2, 'single'],
            'max-len': [2,
                {
                    code: 120,
                    ignoreComments: true
                }],
            'unused-imports/no-unused-imports': 2,
            '@typescript-eslint/naming-convention': [
                2,
                {
                    selector: 'variable',
                    format: [
                        'camelCase',
                        'PascalCase',
                        'UPPER_CASE'
                    ],
                },
                {
                    selector: 'function',
                    format: ['camelCase', 'PascalCase'],
                },
                {
                    selector: 'typeLike',
                    format: ['PascalCase', 'UPPER_CASE'],
                },
            ],
            'no-void': ['error',
                {
                    allowAsStatement: true,
                },],
            'object-curly-newline': ['error',
                {
                    minProperties: 2,
                    multiline: true,
                    consistent: true
                }],
            'object-property-newline': 'error',
            'array-bracket-newline': ['error', { minItems: 3 }],
            'array-element-newline': ['error',
                {
                    minItems: 3,
                    multiline: true
                }],
            'object-curly-spacing': ['error', 'always'],
            'keyword-spacing': ['error',
                {
                    before: true,
                    after: true
                }],
            'stylistic/key-spacing': ['error',
                {
                    beforeColon: false,
                    afterColon: true,
                    mode: 'strict',
                },],
            'stylistic/no-multi-spaces': 'error',
            '@typescript-eslint/no-empty-object-type': 0,
        }
    }
);
