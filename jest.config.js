/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 10000,
  testRegex: '.api.test.ts$',
  setupFilesAfterEnv: ['<rootDir>/src/runAfterAllTests.ts'],
};