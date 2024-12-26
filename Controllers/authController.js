const userModel = require("../Model/userModel");
const user = require("../Model/userModel");
const bcrypt = require("bcrypt");

async function registetionController(req, res) {
  const { name, email, password } = req.body;
  await bcrypt.hash(password, 10, function (err, hash) {
    try {
      let user = new userModel({ name, email, password: hash });
      user.save();
      res.status(201).send(user);
    } catch (error) {}
  });
}

function LoginController(req, res) {
  res.status(200).send("LoginController");
}

module.exports = { registetionController, LoginController };
