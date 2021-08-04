const express = require("express");
const jsonfile = require("jsonfile");
const BadRequest = require("../../services/errors");
const _ = require("lodash");

//import helper functions from utils
const services = require("../../services/utils");
const helperFunctions = require("../../services/helperFunctions");

const router = new express.Router();

//All api routes goes here

// add product to the json file
router.post("/product", async (req, res, next) => {
  const productData = req.body;
  const currentProducts = services.getAllProducts();
  const isProductExist = helperFunctions.isProductExist(
    currentProducts,
    productData,
    "productid"
  );
  if (_.isEmpty(productData)) {
    res.status(400).json({
      statusCode: 400,
      message: "Empty request sent. Please send request body",
      status: "failed",
      data: [],
    });
    throw new Error("Empty request sent. Please send request body");
  }

  if (isProductExist) {
    res.status(400).json({
      statusCode: 400,
      message: "Product with same id already exists",
      status: "failed",
      data: [],
    });
    throw new Error("Product with same id already exists");
  }
  try {
    const addedProduct = await services.addProductData(productData);
    res.status(200).json({
      statusCode: 200,
      message: "product data added successfully",
      status: "success",
      data: [addedProduct],
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "There was a error while adding product, Please try again",
      status: "success",
      data: [],
    });
    next();
  }
});

// get all products list api
router.get("/products", async (req, res, next) => {
  try {
    const productsData = services.getAllProducts();
    res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "products fetched successfully",
      data: [...productsData],
    });
  } catch (error) {
    res.status(400).json({
      statusCode: 400,
      status: "failed",
      message: "Unable to get products data",
      data: [...productsData],
    });
    next(error);
  }
});

//Get product by specific Id
router.get("/products/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const fetchedProduct = await services.getProductById(id);
    if (!fetchedProduct) {
      res.status(400).json({
        statusCode: 400,
        status: "failed",
        message: "product doesn't exists!",
        data: [],
      });
      throw new Error("product doesn't exists!");
    }
    res.status(200).json({
      statusCode: 200,
      status: "Success",
      message: "product data found",
      data: [fetchedProduct],
    });
  } catch (error) {
    res.status(400).json({
      message: "unabale get product data",
      status: "failed",
      statusCode: 400,
      data: [],
    });
    next(error);
  }
});

//Update product by id
router.put("/product", async (req, res, next) => {
  const updatedData = req.body;
  const id = req.body.productid;
  // const productTopUpdate=
  const isProductExist = await services.getProductById(id);
  if (_.isEmpty(updatedData)) {
    res.status(400).json({
      statusCode: 400,
      message: "Empty request sent. Please send request body",
      status: "failed",
      data: [],
    });
    throw new Error("Empty request sent. Please send request body");
  }

  if (!isProductExist) {
    res.status(400).json({
      statusCode: 400,
      status: "failed",
      message: "Product with requested id doesn't exist ",
      data: [],
    });
    throw new Error("Product with requested id doesn't exist ");
  }
  try {
    const dataUpdated = await services.findProductAndUpdate(id, updatedData);
    res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "product data updated successfully",
      data: [dataUpdated],
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      status: "failed",
      message: "Unable to update the product",
      data: [],
    });
    next(error);
  }
});

//5) Delete product by id
router.delete("/product/:id", async (req, res, next) => {
  const id = req.params.id;
  const isProductExist = services.getProductById(id);
  if (!isProductExist) {
    res.status(400).json({
      statusCode: 400,
      status: "failed",
      message: "Product with requested id doesn't exist",
    });
    throw new Error("Product with requested id doesn't exist");
  }
  try {
    const deletedProduct = await services.findProductAndDelete(id);
    res.status(200).json({
      statusCode: 200,
      status: "Success",
      message: "product deleted successfully",
      data: [deletedProduct],
    });
  } catch (error) {
    res.status(400).json({
      statusCode: 400,
      status: "failed",
      message: "Unable to delete the product",
      data: [],
    });
  }
  next(error);
});

module.exports = router;
