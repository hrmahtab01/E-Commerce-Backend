function registetionController(req, res) {
  res.send("registetionController");
}

function LoginController(req, res) {
  res.status(200).send("LoginController");
}

module.exports = { registetionController, LoginController };
