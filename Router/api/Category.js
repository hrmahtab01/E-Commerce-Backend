const express = require("express");
const {
  CreatecategoryController,
} = require("../../Controllers/categoryController");
const multer = require("multer");
const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniquefilename = Date.now() + "-" + Math.round(Math.random() * 1e9);
    console.log();
    const extention = file.originalname.split(".");
    const extentondata = extention[1];

    cb(null, file.fieldname + "-" + `${uniquefilename}.${extentondata}`);
  },
});

const upload = multer({ storage: storage });
const path = require("path");

router.post(
  "/createcategory",
  upload.single("image"),
  CreatecategoryController
);

module.exports = router;
