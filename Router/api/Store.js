const express = require("express");
const router = express.Router();
const upload = require("../../Middleware/Imageuploadmiddleware");
const {
  createstoreController,
  deletestoreController,
} = require("../../Controllers/StoreController");

const multerErrorCheck = (error, req, res, next) => {
  if (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

router.post(
  "/createstore",
  upload.single("image"),
  multerErrorCheck,
  createstoreController
);

router.delete("/deletestore/:id", deletestoreController);

module.exports = router;
