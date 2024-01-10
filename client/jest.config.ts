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
    '**/shared/lib/react/components/PrivateRoute.tsx',
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
    '!**/app/providers/**',
    '!**/shared/lib/react/components/HistoryRouter.tsx',
    '!**/shared/lib/react/hooks/**',
    '!**/shared/lib/react/lib/**',
    '!**/shared/lib/redux/**',
    '!**/shared/lib/window/**',
    '!**/shared/api/axios/**',
  ],
  setupFilesAfterEnv: ['./src/setupTests.ts'],
};
