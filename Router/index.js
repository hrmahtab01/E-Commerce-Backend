const express = require("express");
const router = express.Router();
const auth = require("./auth");
const product = require("./product");

const baseurl = process.env.base_url;

router.use(baseurl, auth);
router.use(baseurl, product);
module.exports = router;
