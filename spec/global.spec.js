const server = require("../index");

var serverInstance;

beforeAll(function (done) {
  serverInstance = require("../index");
  done();
});

afterAll(function (done) {
  serverInstance.close(done);
});
