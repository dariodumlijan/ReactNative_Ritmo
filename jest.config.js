module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.tsx$': 'ts-jest',
  },
  setupFiles: ['./setupTests.js'],
};
