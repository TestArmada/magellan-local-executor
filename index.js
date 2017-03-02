const executor = require("./lib/executor").default;
const configuration = require("./lib/configuration").default;
const profile = require("./lib/profile").default;
const help = require("./lib/help").default;

module.exports = {
  name: "testarmada-magellan-local-executor",
  shortName: "local",

  // from help
  help: help,

  getConfig: configuration.getConfig,
  validateConfig: configuration.validateConfig,

  getNightwatchConfig: profile.getNightwatchConfig,
  getProfiles: profile.getProfiles,
  getCapabilities: profile.getCapabilities,
  listBrowsers: profile.listBrowsers,

  setupRunner: executor.setupRunner,
  teardownRunner: executor.teardownRunner,
  setupTest: executor.setupTest,
  teardownTest: executor.teardownTest,
  execute: executor.execute,
  summerizeTest: executor.summerizeTest
};
