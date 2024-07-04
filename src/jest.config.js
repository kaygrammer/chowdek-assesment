export default {
  testEnvironment: "node",
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleFileExtensions: ["js", "jsx"],
  setupFilesAfterEnv: ["./__tests__/setupTests.test.js"],
  testTimeout: 30000,
  setupFiles: ['<rootDir>/jest.setup.js'],
  testMatch: ["**/?(*.)+(spec|test).js"],
};
