# Magellan-Local-Executor

[![Build Status](https://travis-ci.org/TestArmada/magellan-local-executor.svg?branch=master)](https://travis-ci.org/TestArmada/magellan-local-executor)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![codecov](https://codecov.io/gh/TestArmada/magellan-local-executor/branch/master/graph/badge.svg)](https://codecov.io/gh/TestArmada/magellan-local-executor)

Executor for [Magellan](https://github.com/TestArmada/magellan) to run [nightwatchjs](http://nightwatchjs.org/) tests in local environment. 

**PLEASE NOTE: Executor is only supported by magellan version 10.0.0 or higher**.

## What does this executor do
 1. It resolves `nightwatch.json`, provide nightwatch execution environment to magellan
 2. It runs nightwatch test by forking it as magellan child process

## How To Use
Please follow the steps

 1. `npm install testarmada-magellan-local-executor --save`
 2. add following block to your `magellan.json` (if there isn't a `magellan.json` please create one under your folder root)
 ```javascript
 "executors": [
    "testarmada-magellan-local-executor"
 ]
 ```

 3. `./node_modules/.bin/magellan ----help` to see if you can see the following content printed out
 ```
  Executor-specific (testarmada-magellan-local-executor)
   --local_browser=browsername          Run tests in chrome, firefox, etc (default: phantomjs).
   --local_browsers=b1,b2,..            Run multiple browsers in parallel.
   --local_list_browsers                List the available browsers configured.
 ```

Congratulations, you're all set. 

## Example
To run test in local chrome
```
$ ./node_modules/.bin/magellan --local_browser chrome --test xxx
```

To run tests in local chrome and firefox
```
$ ./node_modules/.bin/magellan --local_browsers chrome,firefox --test xxx
```