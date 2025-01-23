const express = require("express");
const {
  
  LoginController,
  otpVerifyController,
  resendOtpController,
  registetionController,
} = require("../../Controllers/authController");
const getusermiddleware = require("../../Middleware/getusermiddleware");
const router = express.Router();

router.post("/registetion", registetionController);
router.post("/login", LoginController);
router.post("/otp-verify" , otpVerifyController)
router.post("/resend-otp" , resendOtpController)
router.get("/alluser", getusermiddleware, (req, res) => {
    res.send("all user");
});


module.exports = router;
