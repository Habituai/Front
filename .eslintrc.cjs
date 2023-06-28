module.exports = {
    env: { browser: true, es2020: true },
    extends: [
        'plugin:react/recommended',
        'plugin:jest/recommended',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    plugins: ['react-refresh', 'jest'],
    rules: {
        'react-refresh/only-export-components': 'warn',
        'no-underscore-dangle': 0,
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'always',
                jsx: 'always',
            },
        ],
    },
};
