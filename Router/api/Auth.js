const express = require("express");
const {
  registetionController,
  LoginController,
} = require("../../Controllers/authController");
const getusermiddleware = require("../../Middleware/getusermiddleware");
const router = express.Router();

router.post("/registetion", registetionController);
router.post("/login", LoginController);
router.get("/alluser", getusermiddleware, (req, res) => {
    res.send("all user");
});

module.exports = router;
