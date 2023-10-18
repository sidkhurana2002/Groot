// routes/discountRoutes.js
const express = require("express");
const router = express.Router();
const discountController = require("../controllers/discountController");

router.post("/addDiscount", discountController.addDiscount);

module.exports = router;
