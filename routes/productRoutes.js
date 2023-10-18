// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.post("/addProduct", productController.addProduct);
router.get("/getAllProducts", productController.getAllProducts);

module.exports = router;
