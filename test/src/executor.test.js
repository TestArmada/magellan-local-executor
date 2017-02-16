import executor from "../../lib/executor";
import chai from "chai";
import chaiAsPromise from "chai-as-promised";
import _ from "lodash";

import logger from "../../lib/logger";

// eat console logs
// logger.output = {
//   log() { },
//   error() { },
//   debug() { },
//   warn() { }
// };

chai.use(chaiAsPromise);

const expect = chai.expect;
const assert = chai.assert;

describe("Executor", () => {
  it("setup", () => {
    return executor
      .setup()
      .then()
      .catch(err => assert(false, "executor doesn't setup correctly." + err));
  });

  it("teardown", () => {
    return executor
      .teardown()
      .then()
      .catch(err => assert(false, "executor doesn't teardown correctly." + err));
  });

  it("stage", (done) => {
    executor.stage(() => {
      assert(true);
      done();
    });
  });

  it("wrapup", (done) => {
    executor.wrapup({}, () => {
      assert(true);
      done();
    });
  });

  it("execute", () => {
    const mocks = {
      fork(cmd, args, opts) {
        return 1;
      }
    };

    const testRun = {
      getCommand() { },
      getArguments() { }
    };

    let r = executor.execute(testRun, {}, mocks);
    expect(r).to.equal(1);
  });

});