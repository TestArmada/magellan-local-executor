import profile from "../../lib/profile";
import chai from "chai";
import chaiAsPromise from "chai-as-promised";
import _ from "lodash";

chai.use(chaiAsPromise);

const expect = chai.expect;
const assert = chai.assert;

describe("Profile", () => {
  describe("getProfiles", () => {
    it("mocha via cmd", () => {
      let argvMock = {
        local_mocha: true
      };

      let opts = {
        settings: {
          testFramework: {
          }
        }
      };

      return profile
        .getProfiles(opts, argvMock)
        .then((p) => {
          expect(p.length).to.equal(1);
          expect(p[0].executor).to.equal("local");
          expect(p[0].id).to.equal("mocha");
        })
        .catch(err => assert(false, "getProfile isn't functional" + err));
    });

    it("mocha via plugin", () => {
      let opts = {
        settings: {
          testFramework: {
            name: "testarmada-magellan-mocha-plugin"
          }
        }
      };

      return profile
        .getProfiles(opts)
        .then((p) => {
          expect(p.length).to.equal(1);
          expect(p[0].executor).to.equal("local");
          expect(p[0].id).to.equal("mocha");
        })
        .catch(err => assert(false, "getProfile isn't functional" + err));
    });

    it("with local_browser", () => {
      let argvMock = {
        local_browser: "chrome"
      };

      let opts = {
        settings: {
          testFramework: {
            settings: {
              nightwatchConfigFilePath: "./test/src/nightwatch.json"
            }
          }
        }
      };

      return profile
        .getProfiles(opts, argvMock)
        .then((p) => {
          expect(p.length).to.equal(1);
          expect(p[0].desiredCapabilities.browserName).to.equal("chrome");
          expect(p[0].executor).to.equal("local");
          expect(p[0].nightwatchEnv).to.equal("chrome");
          expect(p[0].id).to.equal("chrome");
        })
        .catch(err => assert(false, "getProfile isn't functional" + err));
    });

    it("with local_browsers", () => {
      let argvMock = {
        local_browsers: "chrome,safari"
      };

      let opts = {
        settings: {
          testFramework: {
            settings: {
              nightwatchConfigFilePath: "./test/src/nightwatch.json"
            }
          }
        }
      };

      return profile
        .getProfiles(opts, argvMock)
        .then((p) => {
          expect(p.length).to.equal(2);
          expect(p[0].desiredCapabilities.browserName).to.equal("chrome");
          expect(p[0].executor).to.equal("local");
          expect(p[0].nightwatchEnv).to.equal("chrome");
          expect(p[0].id).to.equal("chrome");

          expect(p[1].desiredCapabilities.browserName).to.equal("safari");
          expect(p[1].executor).to.equal("local");
          expect(p[1].nightwatchEnv).to.equal("safari");
          expect(p[1].id).to.equal("safari");
        })
        .catch(err => assert(false, "getProfile isn't functional" + err));
    });

    it("without local_browsers or local_browser", () => {
      let argvMock = {};

      let opts = {
        settings: {
          testFramework: {
            settings: {
              nightwatchConfigFilePath: "./test/src/nightwatch.json"
            }
          }
        }
      };

      return profile
        .getProfiles(opts, argvMock)
        .then(p => expect(p).to.equal(undefined))
        .catch(err => assert(false, "getProfile isn't functional" + err));
    });
  });

  describe("getCapabilities", () => {
    it("mocha", () => {
      let opts = {
        settings: {
          testFramework: {
            name: "testarmada-magellan-mocha-plugin"
          }
        }
      };

      return profile
        .getCapabilities(null, opts)
        .then((p) => {
          expect(p.executor).to.equal("local");
          expect(p.id).to.equal("mocha");
        })
        .catch(err => assert(false, "getProfile isn't functional" + err));
    });

    it("succeed", () => {
      let opts = {
        settings: {
          testFramework: {
            settings: {
              nightwatchConfigFilePath: "./test/src/nightwatch.json"
            }
          }
        }
      };

      return profile
        .getCapabilities("chrome", opts)
        .then((p) => {
          expect(p.desiredCapabilities.browserName).to.equal("chrome");
          expect(p.executor).to.equal("local");
          expect(p.nightwatchEnv).to.equal("chrome");
          expect(p.id).to.equal("chrome");
        })
        .catch(err => assert(false, "getCapabilities isn't functional" + err));
    });

    it("succeed", () => {
      let opts = {
        settings: {
          testFramework: {
            settings: {
              nightwatchConfigFilePath: "./test/src/nightwatch.json"
            }
          }
        }
      };

      return profile
        .getCapabilities("android", opts)
        .then((p) => assert(false, "getCapabilities isn't functional"))
        .catch(err => expect(err).to.equal("profile: android isn't found"));
    });

    it("listBrowsers", (done) => {
      let opts = {
        settings: {
          testFramework: {
            settings: {
              nightwatchConfigFilePath: "./test/src/nightwatch.json"
            }
          }
        }
      };

      return profile
        .listBrowsers(opts, () => {
          done();
        });
    });

    it("mocha listBrowsers", (done) => {
      let opts = {
        settings: {
          testFramework: {
            name: "testarmada-magellan-mocha-plugin"
          }
        }
      };

      return profile
        .listBrowsers(opts, () => {
          done();
        });
    });
  });
});