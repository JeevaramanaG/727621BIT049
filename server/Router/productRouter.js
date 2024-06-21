const express = require("express");
const { getProduct, getProductId } = require("../Controller/productCtrl");

const router = express.Router();

// Get all products in a specific category
router.get("/categories/:categoryname/products", getProduct);

// Get a specific product by its ID within a category
router.get("/categories/:categoryname/products/:productId", getProductId);

module.exports = router;
