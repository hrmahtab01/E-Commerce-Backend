const express = require("express");
const auth = require("../../Model/AuthModel");
const router = express.Router();
const bycript = require("bcrypt");

router.get("/auth", (req, res) => {
  res.status(200).send("this is auth router");
});
router.post("/login", async (eq, res) => {});

router.post("/reqister", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      res.status(400).send("all fields are required");
    }
    const useralreadyexists = await auth.findOne({ email });
    if (useralreadyexists) {
      res.status(400).send({ message: "user already exist" });
    }
    const hashpassword = await bycript.hash(password, 10);
    const verificationtoken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const user = await auth.create({
      name,
      email,
      password: hashpassword,
      verificationtoken,
      verificationexpire: Date.now() + 24 * 60 * 60 * 1000,
    });
    res.status(200).send({message:"user created successfully" , user})
  } catch (error) {
    res.status(400).send("something went wrong in register");
  }
});

router.post("/logout", (req, res) => {
  res.status(200).send("this is logout router");
});

module.exports = router;
