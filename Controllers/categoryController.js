const { error } = require("console");
const categoryModel = require("../Model/categoryModel");
const fs = require("fs");
const path = require("path");

async function CreatecategoryController(req, res) {
  const { name, description } = req.body;
  const { filename } = req.file;
  if (!name) {
    return res.status(400).send({ error: "name is required" });
  }
  if (!filename) {
    return res.status(400).send({ error: "iamge is required" });
  }

  const category = await categoryModel.create({
    name,
    description,
    image: process.env.host_url + filename,
  });
  res
    .status(201)
    .send({ success: true, message: "category created successfully" });
}

async function deletecategoryController(req, res) {
  const { id } = req.params;

  try {
    const exitcategory = await categoryModel.findOneAndDelete({ _id: id });
    if (!exitcategory) {
      return res
        .status(404)
        .send({ success: false, message: "category not found" });
    }

    const cateimage = exitcategory.image.split("/");
    const filename = cateimage[cateimage.length - 1];
    fs.unlink(path.join(__dirname, `${"../uploads"}/${filename}`), (error) => {
      if (error) {
        return res.status(500).send({ success: false, message: error.message });
      }
      res.status(200).send({
        success: true,
        message: "category deleted successfully",
        data: exitcategory,
      });
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "something went wrong ",
    });
  }
}

module.exports = { CreatecategoryController, deletecategoryController };
