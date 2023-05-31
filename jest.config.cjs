module.exports = {
    coverageDirectory: 'coverage',
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testMatch: ['<rootDir>/**/*.spec.ts?(x)'],
    transform: {
        '^.+\\.(t|j)sx?$': [
            '@swc/jest',
            {
                jsc: {
                    transform: {
                        react: {
                            runtime: 'automatic',
                        },
                    },
                },
            },
        ],
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        "\\.(css)$": "identity-obj-proxy",
    },
    // moduleDirectories: ['node_modules', '<!----><rootDir>/src'],
    // setupFilesAfterEnv: ['./jest.setup.js']
};

