const db = require("../db/db");
const fs = require("fs");

// add product data to the list
const addProductData = (product) => {
  const currentsProductsData = db.getProductsData();

  if (
    !currentsProductsData.some((prd) => prd.productid === product.productid)
  ) {
    currentsProductsData.push(product);
  }

  const productsArr = [...currentsProductsData];
  db.storeProductData(productsArr);

  return product;
};

//find product by id and return updated product
const findProductAndUpdate = (id, updatedData) => {
  const productsData = db.getProductsData();
  const indexOfProduct = productsData.findIndex(
    (item) => item.productid === id
  );
  productsData[indexOfProduct] = { ...updatedData };
  db.storeProductData(productsData);
  return updatedData;
};

//delete product by id
const findProductAndDelete = (id) => {
  //get products data from json
  const productsData = db.getProductsData();
  const indexOfProduct = productsData.findIndex(
    (item) => item.productid === id
  );
  const findProductAndDelete = productsData?.splice(indexOfProduct, 1);
  db.storeProductData(productsData);

  return findProductAndDelete;
};

//get all products from json file
const getAllProducts = () => {
  const productsData = db.getProductsData();
  return [...productsData];
};

//get product by id from json file
const getProductById = (id) => {
  const productsData = db.getProductsData();
  const fetchedProductById = productsData?.find(
    (product) => product.productid === id
  );
  return fetchedProductById;
};

module.exports = {
  findProductAndUpdate,
  addProductData,
  findProductAndDelete,
  getAllProducts,
  getProductById,
};
