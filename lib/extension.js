"use strict";


var ExecutorExtension = function ExecutorExtension(options) {
  // local use for now
  this.options = options;
};

ExecutorExtension.prototype = {
  initialize: function (callback) {
    callback();
  },
  teardown: function (callback) {
    callback();
  },
  release: function (worker) {

  }
};

module.exports = ExecutorExtension;