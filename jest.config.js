// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  preset: "ts-jest",
  verbose: true,
  coverageDirectory: "./coverage",
  testMatch: ["**/?(*.)+(spec).ts"],
  resetMocks: true,
  clearMocks: true,
};

module.exports = config;

// Or async function
module.exports = async () => {
  return {
    verbose: true,
  };
};
