const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const productRoutes = require("./routes/products");
const handleErrors = require("./middleware/handleErrors");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());
app.use(productRoutes);

const port = process.env.PORT || 3000;

//Error handling
app.use(handleErrors);

const server = app.listen(port, () => {
  console.log("Server is up on port " + port);
});

module.exports = server;
