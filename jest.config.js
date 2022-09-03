module.exports = {
  preset: 'react-native',
  testEnvironment: 'node',
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    './jest.setup.js',
  ],
  transform: {
    'node_modules/.+\\.(js|jsx)?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)/)',
  ],
};
