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
    '!**/const.ts',
    '!**/types.d.ts',
    '!**/*.config.ts',
    '!**/App.tsx',
    '!**/browserHistory.ts',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/mock/**',
    '!**/tests/**',
    '!**/actions/**',
    '!**/app/store/**',
    '!**/shared/lib/react/**',
    '!**/shared/lib/redux/**',
    '!**/shared/lib/window/**',
    '!**/shared/api/axios/**',
  ],
  setupFilesAfterEnv: ['./src/setupTests.ts'],
};
