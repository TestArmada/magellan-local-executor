import configuration from "../../lib/configuration";
import chai from "chai";
import chaiAsPromise from "chai-as-promised";
import _ from "lodash";

chai.use(chaiAsPromise);

const expect = chai.expect;
const assert = chai.assert;

describe("Configuration", () => {
  it("getConfig", () => {
    const config = configuration.getConfig();

    expect(config).to.eql({});
  });

  it("validateConfig", () => {
    const config = configuration.validateConfig();

    expect(config).to.eql({});
  });
});