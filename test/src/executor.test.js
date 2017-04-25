import executor from "../../lib/executor";
import chai from "chai";
import chaiAsPromise from "chai-as-promised";
import _ from "lodash";

chai.use(chaiAsPromise);

const expect = chai.expect;
const assert = chai.assert;

describe("Executor", () => {
  it("setupRunner", () => {
    return executor
      .setupRunner()
      .then()
      .catch(err => assert(false, "executor doesn't setup correctly." + err));
  });

  it("teardownRunner", () => {
    return executor
      .teardownRunner()
      .then()
      .catch(err => assert(false, "executor doesn't teardown correctly." + err));
  });

  it("setupTest", (done) => {
    executor.setupTest(() => {
      assert(true);
      done();
    });
  });

  it("teardownTest", (done) => {
    executor.teardownTest({}, () => {
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

  it("summerizeTest", (done) => {
    executor.summerizeTest(null, null, () => done());
  });
});