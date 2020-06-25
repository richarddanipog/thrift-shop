const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: { type: String, require: true },
  price: { type: String, require: true },
  size: { type: String, require: true },
  color: { type: String, require: true },
  brand: { type: String, require: true },
  details: { type: String, require: true },
  gender: { type: String, require: true },
  condition: { type: String, require: true },
  category: { type: String, require: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  images: { type: Array, require: true },
});

module.exports = mongoose.model("Product", productSchema);
