const express = require("express");
const {
  CreatecategoryController,
  deletecategoryController,
  allcategoryController,
  getsinglecategoryController,
  updatecategoryController,
} = require("../../Controllers/categoryController");
const multer = require("multer");
const { route } = require("./Auth");
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

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
function errorCheck(error, req, res, next) {
  if (error) {
    return res.status(500).send({ success: false, message: error.message });
  }

  next();
}

router.post(
  "/createcategory",
  getusermiddleware,
  upload.single("image"),
  errorCheck,
  CreatecategoryController
);
router.delete(
  "/deletecategory/:id",
  getusermiddleware,
  deletecategoryController
);
router.get("/allcategory", allcategoryController);
router.get("/singlecategory/:id", getsinglecategoryController);
router.patch(
  "/updatecategory/:id",
  getusermiddleware,
  upload.single("image"),
  errorCheck,
  updatecategoryController
);

module.exports = router;
