/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js'
  },
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/index.{ts,tsx}',
    '!**/tests-index.ts',
    '!**/types.d.ts',
    '!**/const.ts',
    '!**/mock/**',
    '!**/tests/**',
    '!**/actions/**',
    '!**/shared/lib/react/hooks/**',
    '!**/shared/api/firebase/lib/**',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/*.config.ts'
  ],
  setupFilesAfterEnv: ['./src/setupTests.ts'],
};
