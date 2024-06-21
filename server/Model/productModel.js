const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  uniqueId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  company: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  discount: { type: Number, required: true },
});
const Product = mongoose.model("product",productSchema);

export default Product;