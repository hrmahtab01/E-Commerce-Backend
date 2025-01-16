const express = require("express");
const router = express.Router();
const auth = require("./Auth");
const category = require("./Category")

router.use("/auth", auth);
router.use("/category",category)

module.exports = router;
