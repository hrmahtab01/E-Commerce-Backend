const express = require("express");
const {
  createproductController,
} = require("../../Controllers/ProductController");
const multer = require("multer");
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
    return res.status(500).send({success:false , message:error.message});
  
    
   }
};

router.post("/createproduct", upload.array("image"),multerErrorCheck, createproductController);

module.exports = router;
