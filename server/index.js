const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/727621BIT049");
    console.log("DB connected");
  } catch (err) {
    console.error("Database connection error: ", err);
    process.exit(1);
  }
};
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running in the port ${PORT}`);
});
