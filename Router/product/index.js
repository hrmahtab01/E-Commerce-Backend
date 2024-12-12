const express = require("express");
const router = express.Router();

router.
  get("/product", (req, res) => {
    res.status(200).send("this is product router");
  });

module.exports = router;
