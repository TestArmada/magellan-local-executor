import { argv } from "yargs";

import logger from "./logger";
import settings from "./settings";

export default {
  getConfig: () => {
    return settings.config;
  },

  validateConfig: (opts, argvMock = null, envMock = null) => {
    return settings.config;
  }
};