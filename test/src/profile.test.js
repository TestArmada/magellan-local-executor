import profile from "../../lib/profile";
import chai from "chai";
import chaiAsPromise from "chai-as-promised";
import _ from "lodash";

chai.use(chaiAsPromise);

const expect = chai.expect;
const assert = chai.assert;

describe("Profile", () => {
  describe("getProfiles", () => {
    it("with local_browser", () => {
      const argvMock = {
        local_browser: "chrome"
      };

      const opts = {
        settings: {
          testFramework: {
            profile: {
              getProfiles: (browsers) => {
                return [{
                  desiredCapabilities: { browserName: 'chrome' },
                  executor: 'local',
                  id: 'chrome'
                }];
              }
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
          expect(p[0].id).to.equal("chrome");
        })
        .catch(err => assert(false, "getProfile isn't functional" + err));
    });

    it("with local_browsers", () => {
      const argvMock = {
        local_browsers: "chrome,safari"
      };

      const opts = {
        settings: {
          testFramework: {
            profile: {
              getProfiles: (browsers) => {
                return [{
                  desiredCapabilities: { browserName: 'chrome' },
                  executor: 'local',
                  id: 'chrome'
                }, {
                  desiredCapabilities: { browserName: 'safari' },
                  executor: 'local',
                  id: 'safari'
                }];
              }
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
          expect(p[0].id).to.equal("chrome");

          expect(p[1].desiredCapabilities.browserName).to.equal("safari");
          expect(p[1].executor).to.equal("local");
          expect(p[1].id).to.equal("safari");
        })
        .catch(err => assert(false, "getProfile isn't functional" + err));
    });

    it("without local_browsers or local_browser", () => {
      let argvMock = {};

      const opts = {
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
  });

  describe("getCapabilities", () => {
    it("succeed", () => {
      const argvMock = {
        local_browsers: "chrome,safari"
      };

      const opts = {
        settings: {
          testFramework: {
            profile: {
              getCapabilities: (profile) => {
                return {
                  desiredCapabilities: { browserName: 'chrome' },
                  executor: 'local',
                  id: 'chrome'
                };
              }
            }
          }
        }
      };

      return profile
        .getCapabilities(null, opts)
        .then((p) => {
          expect(p.executor).to.equal("local");
          expect(p.id).to.equal("chrome");
        })
        .catch(err => assert(false, "getProfile isn't functional" + err));
    });

    it("default", () => {
      let opts = {
        settings: {
          testFramework: {
          }
        }
      };

      return profile
        .getCapabilities("chrome", opts)
        .then((p) => {
          expect(p.executor).to.equal("local");
          expect(p.id).to.equal("mocha");
        })
        .catch(err => assert(false, "getCapabilities isn't functional" + err));
    });

    it("listBrowsers", (done) => {
      let opts = {
        settings: {
          testFramework: {
            profile: {
              listBrowser: () => { return ["chrome"]; }
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