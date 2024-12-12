const express = require("express");
const router = express.Router();

router.get("/auth", (req, res) => {
  res.status(200).send("this is auth router");
});

module.exports = router;
