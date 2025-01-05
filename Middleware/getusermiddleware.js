function getusermiddleware(req, res, next) {
  const token = req.cookies.token;

  if (token) {
    jwt.verify(token, process.env.prv_key, function (err, decoded) {
      if (err) {
        return res.status(401).send({ err: err.message });
      }

      if (decoded.tokeninfo.role === "admin") {
        next();
      } else {
        return res.status(401).send({ err: "credentials unauthorized" });
      }
    });
  }
}

module.exports = getusermiddleware;
