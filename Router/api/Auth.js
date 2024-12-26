const express = require("express");
const { registetionController, LoginController } = require("../../Controllers/authController");
const router = express.Router();

router.post("/registetion", registetionController);
router.post("/login" , LoginController)

module.exports = router;
