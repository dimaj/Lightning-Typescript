const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
      diagnostics: true
    },
    NODE_ENV: 'test'
  },
  preset: 'ts-jest',
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.(ts|js)', '!**/node_modules/**', '!**/dist/**'],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/src/.*.d.ts'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'html', 'lcov'],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 76,
      functions: 80,
      lines: 80
    }
  },
  testResultsProcessor: 'jest-sonar-reporter',
  moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'ts', 'tsx', 'mjs'],
  moduleNameMapper: compilerOptions.paths
    ? pathsToModuleNameMapper(compilerOptionsPaths, { prefix: '<rootDir>/' })
    : undefined,
  setupFiles: ['usertiming', 'jest-webgl-canvas-mock', '<rootDir>/test/test-setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.*.test.js', '<rootDir>/node_modules'],
  transform: {
    '^.+\\.m?jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest'
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!wpe-lightning(-sdk)?)(?!@lightning)'
  ],
  testEnvironment: 'jest-environment-jsdom-fifteen',
  verbose: true
};
