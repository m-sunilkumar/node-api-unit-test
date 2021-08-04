const Request = require("request");

//get all relevant modules
const services = require("../services/utils");

const endpoint = "http://localhost:3000/products";

describe("get all products from json file", () => {
  it("should return 200 status code along with data", (done) => {
    Request.get(endpoint, (err, res) => {
      const responseData = JSON.parse(res.body);
      const actualData = services.getAllProducts();
      expect(responseData.statusCode).toEqual(200);
      expect(responseData.data).toEqual(actualData);
      done();
    });
  });
  it("should return 400 along with error message", (done) => {
    Request.get(`${endpoint}`, async (err, res) => {
      const responseData = JSON.parse(res.body);
      expect(responseData.statusCode).toBe(400);
      expect(responseData.message).toEqual("Unable to get products data");
      done();
    });
  });
});

describe("get product by requested id", () => {
  it("should return 400 along with error message", (done) => {
    Request.get(`${endpoint}/1`, async (err, res) => {
      const responseData = JSON.parse(res.body);
      expect(responseData.statusCode).toBe(400);
      expect(responseData.message.trim()).toEqual("product doesn't exists!");
      done();
    });
  });
});
