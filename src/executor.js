import { fork } from "child_process";
import logger from "./logger";

export default {
  /*eslint-disable no-unused-vars*/
  setup: (mocks = null) => {
    return new Promise((resolve) => {
      resolve();
    });
  },

  /*eslint-disable no-unused-vars*/
  teardown: (mocks = null) => {
    return new Promise((resolve) => {
      resolve();
    });
  },

  stage: (callback) => {
    callback();
  },

  wrapup: (info, callback) => {
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
