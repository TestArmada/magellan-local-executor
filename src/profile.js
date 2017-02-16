import path from "path";
import _ from "lodash";
import { argv } from "yargs";
import logger from "./logger";

export default {
  getProfiles: (opts, argvMock = null) => {
    let runArgv = argv;

    if (argvMock) {
      runArgv = argvMock;
    }

    const configPath = opts.settings.testFramework.settings.nightwatchConfigFilePath;
    const nightwatchConfig = require(path.resolve(configPath));
    const browsers = nightwatchConfig.test_settings;

    return new Promise((resolve, reject) => {
      if (runArgv.local_browser) {
        const localBrowser = runArgv.local_browser;
        if (browsers[localBrowser]) {
          const b = browsers[localBrowser];

          b.executor = "local";
          b.nightwatchEnv = localBrowser;
          b.id = localBrowser;

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

        resolve(returnBrowsers);
      } else {
        resolve();
      }
    });
  },

  /*eslint-disable global-require*/
  getCapabilities: (profile, opts) => {
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
        reject("profile: " + profile + " isn't found");
      }
    });
  },

  /*eslint-disable global-require*/
  listBrowsers: (opts, callback) => {
    const configPath = opts.settings.testFramework.settings.nightwatchConfigFilePath;
    const nightwatchConfig = require(path.resolve(configPath));
    const browsers = nightwatchConfig.test_settings;

    _.forEach(browsers, (capabilities, browser) => {
      logger.loghelp(browser, capabilities);
    });
    callback();
  },
};
