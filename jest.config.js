module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.js',
    '!src/shared-props.js',
    '!**/__stories__/**',
    '!**/__tests__/**',
  ],
  setupFilesAfterEnv: ['<rootDir>/test/jest-setup.js'],
}
