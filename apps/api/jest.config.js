/** @type {import('jest').Config} */
const config = {
  coverageProvider: "v8",

  moduleDirectories: ["node_modules", "src"],

  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  transform: {
    "^.+\\.tsx?$": "babel-jest",
  },
};

module.exports = config;
