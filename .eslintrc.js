module.exports = {
    root: true,
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    plugins: ['@typescript-eslint', 'prettier'],
    extends: [
        'prettier',
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    env: {
        commonjs: true,
        browser: true,
        node: true,
        es6: true,
    },
    parserOptions: {
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
    },
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
    rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': [
            1,
            {
                argsIgnorePattern: '^_',
            },
        ],
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        'react-hooks/exhaustive-deps': 'off',
        'react/display-name': 'off',
        'prettier/prettier': ['error', {}, { usePrettierrc: true }], // Use our .prettierrc file as source
        'react/prop-types': 'off',
        'no-console': 1,
        'no-debugger': 1,
        'react/jsx-uses-react': 'off', // react 17 does not require React imported
        'react/react-in-jsx-scope': 'off', // react 17 does not require React imported
    },
};
