import _ from "lodash";
import { argv } from "yargs";
import logger from "testarmada-logger";

export default {
  getNightwatchConfig: (profile) => {
    logger.prefix = "Local Executor";

    const config = {
      desiredCapabilities: profile.desiredCapabilities
    };

    logger.debug(`executor config: ${JSON.stringify(config)}`);
    return config;
  },

  getProfiles: (opts, argvMock = null) => {
    logger.prefix = "Local Executor";

    let runArgv = argv;

    if (argvMock) {
      runArgv = argvMock;
    }

    return new Promise((resolve) => {
      const browsers = [];

      if (runArgv.local_browser) {
        browsers.push(runArgv.local_browser);
      } else if (runArgv.local_browsers) {
        _.forEach(runArgv.local_browsers.split(","), (browser) => {
          browsers.push(browser);
        });
      }

      if (opts.settings.testFramework.profile
        && opts.settings.testFramework.profile.getProfiles) {
        // if framework plugin knows how to solve profiles
        const profiles = opts.settings.testFramework.profile.getProfiles(browsers);

        _.forEach(profiles, (profile) => {
          profile.executor = "local";
        });

        logger.debug(`detected profile: ${JSON.stringify(profiles)}`);
        resolve(profiles);
      } else {
        // framework doesn't understand how to solve profiles
        logger.warn(`no profile is detected, use the default one`);
        resolve([{ executor: "local", id: "mocha" }]);
      }
    });

  },

  /*eslint-disable global-require*/
  getCapabilities: (profile, opts) => {
    logger.prefix = "Local Executor";

    if (opts.settings.testFramework.profile
      && opts.settings.testFramework.profile.getCapabilities) {
      // if framework plugin knows how to solve capabilities

      return new Promise((resolve, reject) => {
        try {
          const p = opts.settings.testFramework.profile.getCapabilities(profile);
          p.executor = "local";

          resolve(p);
        } catch (e) {
          logger.err(`profile: ${profile} isn't found`);
          reject(e);
        }
      });
    } else {
      // framework doesn't understand how to solve capabilities
      logger.warn(`no capabilities is detected, use the default one`);
      resolve({ executor: "local", id: "mocha" });
    }
  },

  /*eslint-disable global-require*/
  listBrowsers: (opts, callback) => {
    logger.prefix = "Local Executor";

    if (opts.settings.testFramework.profile
      && opts.settings.testFramework.profile.listBrowsers) {
      // if framework plugin knows how to list browsers

      const listedBrowsers = opts.settings.testFramework.profile.listBrowsers();
      logger.log(`Available browsers from file ${configPath}: ${listedBrowsers.join(",")}`);

      return callback();
    } else {
      // if framework plugin doesn't know how to list browsers
      return callback();
    }
  }
};
