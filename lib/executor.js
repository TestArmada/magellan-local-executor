"use strict";


var util = require("util");
var fork = require("child_process").fork;
var _ = require("lodash");
var Q = require("q");
var once = require("once");
var clc = require("cli-color");
var EventEmitter = require("events").EventEmitter;

var logStamp = require("./util/logstamp");

var Executor = function Executor(options) {
  // local use for now
  var self = this;
  this.environments = [];
  this.nodeEnv = process.env;

  var browsers = (options.local_browsers || options.local_browser).split(",");

  _.forEach(browsers, function (browser) {
    var env = { browser: browser };
    if (options.local_resolution) {
      env.resolution = options.local_resolution;
    }

    if (options.local_orientation) {
      env.orientation = options.local_orientation;
    }
    env.toString = function () {
      return " @" + this.browser + " " + (this.resolution ? "res:" + this.resolution : "") + (this.orientation ? "orientation:" + this.orientation : "")
    };
    self.environments.push(env);
  });

  if (options.environment) {
    this.nodeEnv = options.environment;
  }
};

Executor.prototype = {
  endSpawnedProcess: function () {},
  spawnProcess: function (testRun, test) {
    var deferred = Q.defer();

    var statusEmitter = new EventEmitter();
    var stdout = "";
    var stderr = "";

    // get nodejs environment
    var env;
    try {
      env = testRun.getEnvironment(this.nodeEnv);
    } catch (e) {
      deferred.reject(e);
      return deferred.promise;
    }

    // set nodejs env
    var options = {
      env: env,
      silent: true,
      detached: false,
      stdio: ["pipe", "pipe", "pipe"]
    };

    var childProcess;
    try {
      childProcess = fork(testRun.getCommand(), testRun.getArguments(), options);
      // this.notIdle();
    } catch (e) {
      deferred.reject(e);
      return deferred.promise;
    }

    statusEmitter.stdout = childProcess.stdout;
    statusEmitter.stderr = childProcess.stderr;

    childProcess.stdout.on("data", function (data) {
      var text = ("" + data);
      if (text.trim() !== "") {
        text = text
          .split("\n")
          .filter(function (line) {
            return line.trim() !== "" || line.indexOf("\n") > -1;
          })
          .map(function (line) {
            // NOTE: since this comes from stdout, color the stamps green
            return clc.greenBright(logStamp()) + " " + line;
          })
          .join("\n");

        if (text.length > 0) {
          stdout += text + "\n";
        } else {
          stdout += "\n";
        }
      }
    });

    childProcess.stderr.on("data", function (data) {
      var text = ("" + data);
      if (text.trim() !== "") {
        text = text
          .split("\n")
          .filter(function (line) {
            return line.trim() !== "" || line.indexOf("\n") > -1;
          })
          .map(function (line) {
            // NOTE: since this comes from stderr, color the stamps red
            return clc.redBright(logStamp()) + " " + line;
          })
          .join("\n");

        if (text.length > 0) {
          stdout += text + "\n";
        } else {
          stdout += "\n";
        }
      }
    });
    deferred.resolve({
      childProcess: childProcess,
      statusEmitter: statusEmitter,
      stdout: stdout,
      stderr: stderr
    });
    return deferred.promise;
  }
};

module.exports = Executor;
