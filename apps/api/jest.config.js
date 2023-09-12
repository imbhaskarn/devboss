/** @type {import('jest').Config} */
const config = {
  coverageProvider: "v8",

  moduleDirectories: ["node_modules", "src"],
  setupFiles: ["./__tests__/setupTests.ts"],
  testMatch: ["**/__tests__/**/*test.[jt]s?(x)"],
  transform: {
    "^.+\\.tsx?$": "babel-jest",
  },
  verbose: true,
};

module.exports = config;
