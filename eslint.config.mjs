import simpleImportSort from 'eslint-plugin-simple-import-sort';
import react from 'eslint-plugin-react';
import tsparser from '@typescript-eslint/parser';
import stylisticTs from '@stylistic/eslint-plugin-ts';


export default [
    {
        ignores: [
        ],
    },
    {
        files: ["**/*.ts", "**/*.tsx"],

        languageOptions: {
            parser: tsparser,
        },

        plugins: {
            "simple-import-sort": simpleImportSort,
            '@stylistic/ts': stylisticTs,
            react
        },

        rules: {
            quotes: ["warn", "single"],
            "simple-import-sort/imports": "warn",
            semi: ["warn", "always"],
            indent: ["warn", 4],
            "object-curly-spacing": ["warn", "never"],
            "jsx-a11y/alt-text": "off",
            "jsx-a11y/anchor-is-valid": "off",
            "import/first": "off",
            "import/no-anonymous-default-export": "off",
            "react-hooks/exhaustive-deps": "off",
            "no-useless-escape": "off",
            "react/jsx-boolean-value": "warn",
            "@typescript-eslint/no-unused-vars": "off",
            "@stylistic/ts/member-delimiter-style": ["warn", {
                multiline: {
                    delimiter: "comma",
                    requireLast: true,
                },
                singleline: {
                    delimiter: "comma",
                    requireLast: false,
                },
                overrides: {
                    interface: {
                        multiline: {
                            delimiter: "none",
                            requireLast: false,
                        },
                    },
                },
            }],
        },
    },
];
