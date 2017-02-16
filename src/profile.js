import path from "path";
import _ from "lodash";
import { argv } from "yargs";

export default {
  getProfiles: (opts) => {
    const configPath = opts.settings.testFramework.settings.nightwatchConfigFilePath;
    const nightwatchConfig = require(path.resolve(configPath));
    const browsers = nightwatchConfig.test_settings;

    return new Promise((resolve, reject) => {
      if (opts.yargs.argv.local_browser) {
        const localBrowser = opts.yargs.argv.local_browser;
        if (browsers[localBrowser]) {
          const b = browsers[localBrowser];

          b.executor = "local";
          b.nightwatchEnv = localBrowser;
          b.id = localBrowser;

          resolve([b]);
        }
      } else if (opts.yargs.argv.local_browsers) {
        const tempBrowsers = opts.yargs.argv.local_browsers.split(",");
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
        resolve();
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
      logger.log(browser, capabilities);
    });
    callback();
  },
};
