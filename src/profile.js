import path from "path";
import _ from "lodash";
import { argv } from "yargs";
import logger from "testarmada-logger";
logger.prefix = "Local Executor";

export default {
  getNightwatchConfig: (profile) => {
    const config = {
      desiredCapabilities: profile.desiredCapabilities
    };

    logger.debug(`executor config: ${JSON.stringify(config)}`);
    return config;
  },

  getProfiles: (opts, argvMock = null) => {
    let runArgv = argv;

    if (argvMock) {
      runArgv = argvMock;
    }
    if (runArgv.local_mocha
      || opts.settings.testFramework.name
      && opts.settings.testFramework.name === "testarmada-magellan-mocha-plugin") {
      // do nothing for mocha
      return new Promise((resolve) => resolve([{ executor: "local", id: "mocha" }]));
    } else {
      const configPath = opts.settings.testFramework.settings.nightwatchConfigFilePath;

      /*eslint-disable global-require*/
      const nightwatchConfig = require(path.resolve(configPath));
      const browsers = nightwatchConfig.test_settings;

      return new Promise((resolve) => {
        if (runArgv.local_browser) {
          const localBrowser = runArgv.local_browser;
          if (browsers[localBrowser]) {
            const b = browsers[localBrowser];

            b.executor = "local";
            b.nightwatchEnv = localBrowser;
            b.id = localBrowser;

            logger.debug(`detected profile: ${JSON.stringify(b)}`);

            resolve([b]);
          }
        } else if (runArgv.local_browsers) {
          const tempBrowsers = runArgv.local_browsers.split(",");
          const returnBrowsers = [];

          _.forEach(tempBrowsers, (browser) => {
            if (browsers[browser]) {
              const b = browsers[browser];

              b.executor = "local";
              b.nightwatchEnv = browser;
              b.id = browser;

              returnBrowsers.push(b);
            }
          });

          logger.debug(`detected profiles: ${JSON.stringify(returnBrowsers)}`);

          resolve(returnBrowsers);
        } else {
          resolve();
        }
      });
    }
  },

  /*eslint-disable global-require*/
  getCapabilities: (profile, opts) => {
    if (argv.local_mocha
      || opts.settings.testFramework.name
      && opts.settings.testFramework.name === "testarmada-magellan-mocha-plugin") {
      // do nothing for mocha
      return new Promise((resolve) => resolve({ executor: "local", id: "mocha" }));
    } else {
      const configPath = opts.settings.testFramework.settings.nightwatchConfigFilePath;
      const nightwatchConfig = require(path.resolve(configPath));
      const browsers = nightwatchConfig.test_settings;

      return new Promise((resolve, reject) => {
        if (browsers[profile]) {
          const b = browsers[profile];

          b.executor = "local";
          b.nightwatchEnv = profile;
          b.id = profile;

          resolve(b);
        } else {
          reject(`profile: ${profile} isn't found`);
        }
      });
    }
  },

  /*eslint-disable global-require*/
  listBrowsers: (opts, callback) => {
    if (argv.local_mocha
      || opts.settings.testFramework.name
      && opts.settings.testFramework.name === "testarmada-magellan-mocha-plugin") {
      // do nothing for mocha
      return callback();
    } else {
      const configPath = opts.settings.testFramework.settings.nightwatchConfigFilePath;
      const nightwatchConfig = require(path.resolve(configPath));
      const browsers = nightwatchConfig.test_settings;

      const OMIT_BROWSERS = ["default", "sauce"];
      const listedBrowsers = [];


      _.forEach(browsers, (capabilities, browser) => {
        if (OMIT_BROWSERS.indexOf(browser) < 0) {
          logger.debug(`  browser:    ${browser}`);
          logger.debug(`  capabilities: ${JSON.stringify(capabilities)}`);
          listedBrowsers.push(browser);
        }
      });

      logger.log(`Available browsers from file ${configPath}: ${listedBrowsers.join(",")}`);

      return callback();
    }
  }
};
