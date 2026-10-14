const Order = require("../models/orderModel");
const Product = require("../models/productModel");

// GET orders
exports.getOrders = async (req, res) => {
    const orders = await Order.find();
    res.render("order", { orders });
};

// GET create page
exports.createPage = async (req, res) => {
    const products = await Product.find({
        stockStatus: "in_stock"
    });

    res.render("createOrder", { products });
};

// CREATE order
exports.createOrder = async (req, res) => {
    const {
        customerName,
        productName,
        quantity,
        orderDate
    } = req.body;

    const product = await Product.findOne({
        productName: productName,
        stockStatus: "in_stock"
    });

    if (!product) {
        return res.send("Product does not exist or is out of stock");
    }

    const totalPrice = product.unitPrice * Number(quantity);

    await Order.create({
        customerName,
        productName,
        quantity,
        orderDate,
        totalPrice
    });

    res.redirect("/orders");
};

// DELETE
exports.deleteOrder = async (req, res) => {
    await Order.findByIdAndDelete(req.params.id);
    res.redirect("/orders");
};

// GET update page
exports.updatePage = async (req, res) => {
    const order = await Order.findById(req.params.id);
    const products = await Product.find({
        stockStatus: "in_stock"
    });

    res.render("updateOrder", {
        order,
        products
    });
};

// UPDATE
exports.updateOrder = async (req, res) => {
    const {
        customerName,
        productName,
        quantity,
        orderDate
    } = req.body;

    const product = await Product.findOne({
        productName: productName,
        stockStatus: "in_stock"
    });

    if (!product) {
        return res.send("Product does not exist or is out of stock");
    }

    const totalPrice = product.unitPrice * Number(quantity);

    await Order.findByIdAndUpdate(req.params.id, {
        customerName,
        productName,
        quantity,
        orderDate,
        totalPrice
    });

    res.redirect("/orders");
};