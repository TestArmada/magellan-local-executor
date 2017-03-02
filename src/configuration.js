import settings from "./settings";

export default {
  getConfig: () => {
    return settings.config;
  },

  /*eslint-disable no-unused-vars*/
  validateConfig: (opts, argvMock = null, envMock = null) => {
    return settings.config;
  }
};
