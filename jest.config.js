module.exports = {
    roots: ['<rootDir>/src'],
    testMatch: ['**/__tests__/**/*.test.(ts|tsx|js)'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        },
    },
    collectCoverageFrom: ['src/**/*.ts', '!src/__tests__/**/*.ts', '!src/scripts/**/*.ts'],
    testPathIgnorePatterns: ['/__utils__.'],
}
