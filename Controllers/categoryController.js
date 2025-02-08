const { error } = require("console");
const categoryModel = require("../Model/categoryModel");
const fs = require("fs");
const path = require("path");
const { default: mongoose } = require("mongoose");

async function CreatecategoryController(req, res) {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).send({ success: false, error: "name is required" });
  }

  if (!req.file || !req.file.filename) {
    return res.status(400).json({ success: false, error: "Image is required" });
  }
  const { filename } = req.file;
  const existcategory = await categoryModel.findOne({ name });
  if (existcategory) {
    return res.status(409).send({ error: "category already exist" });
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
async function allcategoryController(req, res) {
  try {
    const allcategory = await categoryModel.find({});
    return res.status(200).send({
      success: true,
      message: "get all category successfully",
      data: allcategory,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "something went wrong",
    });
  }
}
async function getsinglecategoryController(req, res) {
  const { id } = req.params;
  try {
    const singlecategory = await categoryModel.findOne({ _id: id });
    if (!singlecategory) {
      return res
        .status(404)
        .send({ success: false, message: "category not found" });
    }
    return res.status(200).send({
      success: true,
      message: "get single category successfully",
      data: singlecategory,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "something went wrong ",
    });
  }
}

async function updatecategoryController(req, res) {
  const { id } = req.params;
  const { name, description } = req.body;

  if (!req.file || !req.file.filename) {
    return res.status(400).send({ success: false, error: "image is required" });
  }
  const { filename } = req.file;

  try {
    const exitcategory = await categoryModel.findOne({ _id: id });
    if (!exitcategory) {
      return res
        .status(404)
        .send({ success: false, message: "category not found" });
    }
    const cateimage = exitcategory.image.split("/");
    const deletefile = cateimage[cateimage.length - 1];
    fs.unlink(
      path.join(__dirname, `${"../uploads"}/${deletefile}`),
      (error) => {
        if (error) {
          return res.status(500).send({
            success: false,
            message: error.message || "something went wrong",
          });
        }
      }
    );

    const category = await categoryModel.findOneAndUpdate(
      {
        _id: id,
      },
      {
        name,
        description,
        image: process.env.host_url + filename,
      },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "category created successfully",
      data: category,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "something went wrong",
    });
  }
}

module.exports = {
  CreatecategoryController,
  deletecategoryController,
  allcategoryController,
  getsinglecategoryController,
  updatecategoryController,
};
