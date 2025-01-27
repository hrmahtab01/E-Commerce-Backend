const { model } = require("mongoose");

async function createstoreController(req, res) {
  res.send("create store succesfully ");
}

module.exports = { createstoreController };
