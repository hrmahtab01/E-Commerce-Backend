const e = require("express");
const emailValidationCheck = require("../helpers/validateEmail");
const userModel = require("../Model/userModel");
const bcrypt = require("bcrypt");
const Sendemail = require("../helpers/SendEmalil");
jwt = require("jsonwebtoken");

async function registetionController(req, res) {
  const { name, email, password } = req.body;
  Sendemail(email);

  if (!name || !email || !password) {
    return res.status(400).send({ error: "All fields are required" });
  }
  if (!name) {
    return res.status(400).send({ error: "name is required" });
  }
  if (!email) {
    return res.status(400).send({ error: "email is required" });
  }
  if (!password) {
    return res.status(400).send({ error: "password is required" });
  }
  if (!emailValidationCheck(email)) {
    return res.status(400).send({ error: "Invalid email" });
  }

  const userExist = await userModel.findOne({ email });
  if (userExist) {
    return res.status(404).send({ error: "User already exist" });
  }
  bcrypt.hash(password, 10, async function (err, hash) {
    if (err) {
      return res.status(400).send({ error: err });
    }
    try {
      let user = new userModel({ name, email, password: hash });
      await user.save();
      res.status(201).send({ message: "user registered successfully", user });
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
      bcrypt.compare(password, exituser.password).then(async function (result) {
        if (result) {
          const tokeninfo = {
            id: exituser._id,
            name: exituser.name,
            email: exituser.email,
            role: exituser.role,
          };
          let token;
          if (exituser.role === "user") {
            token = jwt.sign({ tokeninfo }, process.env.prv_key, {
              expiresIn: "1d",
            });
            res.cookie("token", token, {
              httponly: true,
              secure: false,
            });
          } else if (exituser.role === "admin") {
            token = jwt.sign({ tokeninfo }, process.env.prv_key, {
              expiresIn: "1h",
            });
            res.cookie("token", token, {
              httponly: true,
              secure: false,
            });
          }
          return res
            .status(200)
            .send({ message: "login successfully", user: tokeninfo, token });
        } else {
          return res.status(400).send({ error: "invalid credentials" });
        }
      });
    } else {
      return res.status(400).send({ error: "invalid credentials" });
    }
  } catch (error) {
    return res.status(400).send({ message: error });
  }
}

module.exports = { registetionController, LoginController };
