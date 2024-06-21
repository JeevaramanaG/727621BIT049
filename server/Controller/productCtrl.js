const Product = require("../Model/productModel");

// Controller function to get all products in a specific category
const getProduct = async (req, res) => {
  try {
    const { categoryname } = req.params;
    const products = await Product.find({ category: categoryname }).exec();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to get a specific product by its ID within a category
const getProductId = async (req, res) => {
  try {
    const { categoryname, productId } = req.params;
    const product = await Product.findOne({
      _id: productId,
      category: categoryname,
    }).exec();

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getProduct, getProductId };
