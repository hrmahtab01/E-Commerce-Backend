const express = require("express");
const router = express.Router();
const api = require("./api");

const baseurl = process.env.base_url;

router.use(baseurl, api);

module.exports = router;
                                