const express = require("express");
const {
  createproductController,
  deleteproductController,
  getallProductController,
} = require("../../Controllers/ProductController");
const multer = require("multer");
const getusermiddleware = require("../../Middleware/getusermiddleware");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniquefilename = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extention = file.originalname.split(".");
    cb(
      null,
      file.fieldname +
        "-" +
        `${uniquefilename}.${extention[extention.length - 1]}`
    );
  },
});

const upload = multer({ storage: storage });
const multerErrorCheck = (error, req, res, next) => {
  if (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

router.post(
  "/createproduct",
  getusermiddleware,
  upload.array("image"),
  multerErrorCheck,
  createproductController
);

router.delete("/deleteproduct/:id", getusermiddleware, deleteproductController);
router.get("/allproduct", getallProductController);

module.exports = router;
