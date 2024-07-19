const express = require("express");
const router = express.Router();
const userController = require("./controller/usercontroller");
const productController = require("./controller/productcontroller");
const cartController = require("./controller/cartcontroller");
const authMiddleware = require("./authmiddleware");

// User routes
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

// Product routes
router.get("/products", productController.getProducts);
router.get("/products/:id", productController.getProduct);
router.post("/products", authMiddleware, productController.addProduct);
router.put("/products/:id", authMiddleware, productController.editProduct);

// Cart routes
router.post("/cart", authMiddleware, cartController.addToCart);
router.get("/cart", authMiddleware, cartController.getCart);

module.exports = router;
