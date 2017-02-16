import logger from "./logger";
import settings from "./settings";

export default {
  getConfig: () => {
    logger.debug(`executor config: ${ JSON.stringify(settings.config)}`);
    return settings.config;
  },

  /*eslint-disable no-unused-vars*/
  validateConfig: (opts, argvMock = null, envMock = null) => {
    return settings.config;
  }
};
