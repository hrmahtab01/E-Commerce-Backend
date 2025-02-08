const productModel = require("../Model/productModel");
const fs = require("fs");
const path = require("path");
const categoryModel = require("../Model/categoryModel");
const StoreModel = require("../Model/storeModel");

async function createproductController(req, res) {
  const { name, description, sellingprice, discountprice, category, store } =
    req.body;

  const image = req.files.map((img) => img.filename);

  //   if (!name || !description || !sellingprice || !discountprice || !category) {
  //     return res.status(400).send({ error: "All fields are required" });
  //   }

  // const categoryid = categoryExist._id;
  try {
    const product = await productModel.create({
      name,
      description,
      sellingprice,
      discountprice,
      category,
      image: process.env.host_url + image,
    });
    await categoryModel.findOneAndUpdate(
      { _id: category },
      {
        $push: { product: product._id },
      },
      { new: true }
    );

    await StoreModel.findOneAndUpdate(
      {
        _id: store,
      },
      { $push: { products: product._id } },
      { new: true }
    );
    return res.status(201).send({
      success: true,
      message: "product created successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message || "something went wrong",
    });
  }
}

async function deleteproductController(req, res) {
  const { id } = req.params;

  try {
    const exitproduct = await productModel.findOne({ _id: id });
    if (!exitproduct) {
      return res
        .status(404)
        .send({ success: false, message: "product not found" });
    }

    const productimage = exitproduct.image[0];
    const filename = productimage.split("/");
    const finalfile = filename[filename.length - 1];
    const mainfile = finalfile.split(",");

    fs.unlink(path.join(__dirname, `${"../uploads"}/${mainfile}`), (error) => {
      if (error) {
        return res.status(500).send({ success: false, message: error.message });
      }
      res.status(200).send({
        success: true,
        message: "product deleted successfully",
        data: exitproduct,
      });
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "something went wrong",
    });
  }
}

async function getallProductController(req, res) {
  try {
    const allproduct = await productModel.find({});
    return res.status(200).send({
      success: true,
      message: "get all product successfully",
      data: allproduct,
    });
  } catch (error) {
    return res
      .status(500)
      .send({
        success: false,
        message: error.message || "something went wrong",
      });
  }
}

module.exports = {
  createproductController,
  deleteproductController,
  getallProductController,
};
