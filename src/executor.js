export default {
  setup: () => {
    return new Promise((resolve) => {
      resolve();
    });
  },

  teardown: () => {
    return new Promise((resolve) => {
      resolve();
    });
  },

  stage: (callback) => {
    callback();
  },

  wrapup: (worker, callback) => {
    callback();
  },

  execute: (testRun, options) => {
    return fork(testRun.getCommand(), testRun.getArguments(), options);
  }
};