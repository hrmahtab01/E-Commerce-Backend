const express = require("express");
const router = express.Router();
const auth = require("./Auth");
const category = require("./Category");
const product = require("./Product");

router.use("/auth", auth);
router.use("/category", category);
router.use("/product", product);

module.exports = router;
