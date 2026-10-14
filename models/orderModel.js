const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    customerName: String,
    productName: String,
    quantity: Number,
    orderDate: Date,
    totalPrice: Number
});

module.exports = mongoose.model("Order", orderSchema);