const express = require("express");
const router = express.Router();
const auth = require("./Auth");

router.use("/auth", auth);

module.exports = router;
