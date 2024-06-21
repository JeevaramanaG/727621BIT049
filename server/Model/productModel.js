const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  uniqueId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true, index: true }, 
  company: { type: String, required: true, index: true },  
  price: { type: Number, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  discount: { type: Number, default: 0 },
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
