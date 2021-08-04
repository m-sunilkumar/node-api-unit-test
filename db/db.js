// const data = require("../data/productData.json");

const fs = require("fs");

exports.storeProductData = (data) => {
  try {
    fs.writeFileSync("data/productData.json", JSON.stringify(data), "utf8");
  } catch (error) {
    throw new Error(error);
  }
};

exports.getProductsData = () => {
  const jsonString = fs.readFileSync("data/productData.json");
  const productsData = JSON.parse(jsonString);
  return productsData;
};
