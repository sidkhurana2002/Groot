// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.post("/addProduct", productController.addProduct);
router.post("/getAllProducts", productController.getAllProducts);
router.delete("/deleteProduct", productController.deleteProduct);

module.exports = router;
