// jest.config.js
const nextJest = require("next/jest")

// Providing the path to your Next.js app which will enable loading next.config.js and .env files
const createJestConfig = nextJest({ dir: "./" })

module.exports = createJestConfig({
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: ".",
  modulePaths: ["<rootDir>"],
  testRegex: ["_test/.*\\.spec\\.ts$", ".*\\.spec\\.ts$"],
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "../coverage",
  testEnvironment: "node",
  // "setupFiles": ["dotenv/config"]
})
