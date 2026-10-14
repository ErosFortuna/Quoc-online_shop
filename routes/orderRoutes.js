const express = require("express");
const router = express.Router();

const controller = require("../controllers/orderController");
const { isAuthenticated, isAdmin } = require("../middleware/authMiddleware");

router.get("/", (req, res) => {
    res.redirect("/orders");
});

router.get("/orders", isAuthenticated, controller.getOrders);

router.get("/orders/create", isAuthenticated, controller.createPage);
router.post("/orders/create", isAuthenticated, controller.createOrder);

router.get("/orders/update/:id", isAuthenticated, isAdmin, controller.updatePage);
router.post("/orders/update/:id", isAuthenticated, isAdmin, controller.updateOrder);

router.post("/orders/delete/:id", isAuthenticated, isAdmin, controller.deleteOrder);

module.exports = router;