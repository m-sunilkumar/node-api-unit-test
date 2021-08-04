const request = require("request");

//get all relevant modules
const services = require("../services/utils");

const endpoint = "http://localhost:3000/product";

describe("post product to update json file", () => {
  it("should return 200 status code along with data", function (done) {
    request.post(
      {
        url: endpoint,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          productid: "90",
          productname: "hello ......dell",
          productcode: "GDN-1234",
          description: "new product from dell",
          releasedate: "20-01-2018",
          price: "100000",
          rating: 5,
          imageurl: "",
        }),
      },
      (err, res) => {
        const responseData = JSON.parse(res.body);
        expect(responseData?.statusCode).toEqual(200);
        expect(responseData?.message).toEqual(
          "product data added successfully"
        );
        done();
      }
    );
  });
  it("should return 400 response code with error messgae", function (done) {
    request.post(
      endpoint,
      { json: true, body: {} },
      function (error, response) {
        const responseData = JSON.parse(response.body);
        expect(responseData?.statusCode).toBe(400);
        expect(responseData?.message).toEqual(
          "Product with same id already exists"
        );
        done();
      }
    );
  });
});

describe("update product by requested id", () => {
  it(" should return 200 status code along with returing updated product", function (done) {
    request.put(
      {
        url: endpoint,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          productid: "90",
          productname: "hello ......dell",
          productcode: "GDN-1234",
          description: "new product from dell",
          releasedate: "20-01-2018",
          price: "100000",
          rating: 5,
          imageurl: "",
        }),
      },
      async (err, res) => {
        const responseData = JSON.parse(res.body);
        expect(responseData?.statusCode).toBe(200);
        expect(responseData?.message).toEqual(
          "product data updated successfully"
        );
        done();
      }
    );
  });
  it("should return 400 response code with error messgae when unable to update the product", function (done) {
    request.put(endpoint, { json: true, body: {} }, function (error, response) {
      const responseData = JSON.parse(response.body);
      expect(responseData.statusCode).toEqual(400);
      expect(responseData?.message).toEqual(
        "Product with requested id doesn't exist"
      );
      done();
    });
  });
});
