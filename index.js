"use strict";

var Executor = require("./lib/executor");
var Extension = require("./lib/extension");
var help = require("./help");

module.exports = {
  name: "testarmada-magellan-local-executor",
  prefix: "local",
  Executor: Executor,
  ExecutorExtension: Extension,
  help: help,
  allocator: null
};
