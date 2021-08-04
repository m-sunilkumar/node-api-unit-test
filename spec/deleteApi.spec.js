const services = require("../services/utils");
const request = require("request");
const endpoint = "http://localhost:3000/product";

describe("delete product by id", () => {
  it("should send statusCode 200 along with deleted product", (done) => {
    request.delete(`${endpoint}/8`, (error, response) => {
      const responseData = JSON.parse(response.body);
      expect(responseData.message).toEqual("product deleted successfully");
      done();
    });
  });
  it("should send statusCode 400 along with message", (done) => {
    request.delete(`${endpoint}/1`, (error, response) => {
      const responseData = JSON.parse(response.body);
      expect(responseData?.message).toEqual(
        "Product with requested id doesn't exist"
      );
      done();
    });
  });
});
