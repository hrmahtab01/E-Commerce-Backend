const emailValidationCheck = require("../helpers/validateEmail");
const userModel = require("../Model/userModel");
const user = require("../Model/userModel");
const bcrypt = require("bcrypt");
jwt = require("jsonwebtoken");

async function registetionController(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).send({ error: "All fields are required" });
  }
  if (!emailValidationCheck(email)) {
    return res.status(400).send({ error: "Invalid email" });
  }

  const userExist = await userModel.findOne({ email });
  if (userExist) {
    return res.status(404).send({ error: "User already exist" });
  }
  bcrypt.hash(password, 10, async function (err, hash) {
    try {
      let user = new userModel({ name, email, password: hash });
      await user.save();
      res.status(201).send(user);
    } catch (error) {
      return res.status(404).send(error);
    }
  });
}

async function LoginController(req, res) {
  const { email, password } = req.body;
  try {
    const exituser = await userModel.findOne({ email });
    if (exituser) {
      bcrypt.compare(password, exituser.password).then(function (result) {
        if (result) {
          let token = jwt.sign({ foo: "bar" }, process.env.prv_key, {
            expiresIn: "1h",
          });
          res
            .status(200)
            .send({ message: "login successfully", user: exituser, token });
        } else {
          res.status(400).send({ error: "invalid credentials" });
        }
      });
    } else {
      res.status(400).send({ error: "invalid credentials" });
    }
  } catch (error) {
    res.status(400).send({ message: error });
  }
}

module.exports = { registetionController, LoginController };
