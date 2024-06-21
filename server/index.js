const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./Router/productRouter"); // Direct import
const { port, mongoURI } = require("./config");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", router);

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("DB connected");
  } catch (err) {
    console.error("Database connection error: ", err);
  }
};
connectDB();

// Listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
