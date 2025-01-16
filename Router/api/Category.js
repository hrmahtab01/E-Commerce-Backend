  const express = require("express");
const { CreatecategoryController } = require("../../Controllers/categoryController");
  const router = express.Router();


  router.post("/createcategory", CreatecategoryController)

  module.exports = router