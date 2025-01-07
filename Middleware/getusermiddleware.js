function getusermiddleware(req, res, next) {
  const token = req.cookies.token;

  if (token) {
    jwt.verify(token, process.env.prv_key, function (err, decoded) {
      if (err) {
        return res.status(400).send({ success: false, msg: err.message });
      } else {
        const { role } = decoded.tokeninfo;
        if (role === "admin") {
          next();
        } else {
          return res
            .status(401)
            .send({ success: false, msg: "unauthorized credentials" });
        }
      }
    });
  } else {
    return res.status(404).send({ success: false, msg: "user not found" });
  }
}

module.exports = getusermiddleware;
