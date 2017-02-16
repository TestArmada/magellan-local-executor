import { fork } from "child_process";
import logger from "./logger";

export default {
  /*eslint-disable no-unused-vars*/
  setup: (mocks = null) => {
    return new Promise((resolve) => {
      logger.log("Setting pre-requisites up");
      resolve();
    });
  },

  /*eslint-disable no-unused-vars*/
  teardown: (mocks = null) => {
    return new Promise((resolve) => {
      logger.log("Tearing pre-requisites down");
      resolve();
    });
  },

  stage: (callback) => {
    logger.log("Staging before test run");
    callback();
  },

  wrapup: (info, callback) => {
    logger.log("Cleaning up after test run");
    callback();
  },

  execute: (testRun, options, mocks = null) => {
    let ifork = fork;

    if (mocks && mocks.fork) {
      ifork = mocks.fork;
    }

    return ifork(testRun.getCommand(), testRun.getArguments(), options);
  }
};
