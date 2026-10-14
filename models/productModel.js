const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: String,
    category: String,
    stockStatus: String,
    unitPrice: Number,
    tags: [String]
});

module.exports = mongoose.model("Product", productSchema);