module.exports = {
  verbose: true,
  preset: "react-native",
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  moduleFileExtensions: ["js", "jsx"],
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy"
  },
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  setupFilesAfterEnv: ["./setupTests.js"],
  cacheDirectory: "./cache",
  coverageThreshold: {
    global: {
      statements: 80
    }
  },
  transformIgnorePatterns: [
    "/node_modules/(?!react-native|react-clone-referenced-element|react-navigation)"
  ]
};
