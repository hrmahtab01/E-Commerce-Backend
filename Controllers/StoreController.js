const { model } = require("mongoose");
const StoreModel = require("../Model/storeModel");
const fs = require("fs");
const path = require("path");

async function createstoreController(req, res) {
  const { name, description, products, location, contact, image } = req.body;
  const { filename } = req.file;

  try {
    if (!filename) {
      return res
        .status(400)
        .send({ succe: false, message: "image is required" });
    }
    const extistore = await StoreModel.findOne({ name });
    if (extistore) {
      return res.status(409).send({ error: "store already exist " });
    }

    const store = await StoreModel.create({
      name,
      description,
      image: process.env.host_url + filename,
      products,
      location,
      contact,
    });

    return res.status(201).send({
      success: true,
      message: "store created succefully",
      data: store,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "something went wrong",
    });
  }
}

async function deletestoreController(req, res) {
  const { id } = req.params;
  try {
    const existstore = await StoreModel.findByIdAndDelete({ _id: id });
    if (!existstore) {
      return res
        .status(404)
        .send({ success: false, message: "store not found" });
    }
    const storeimage = existstore.image.split("/");
    const filename = storeimage[storeimage.length - 1];

    fs.unlink(path.join(__dirname, `${"../uploads"}/${filename}`), (error) => {
      if (error) {
        return res.status(500).send({ success: false, message: error.message });
      }
      return res
        .status(200)
        .send({
          success: true,
          message: "store deleted succefully",
          data: existstore,
        });
    });
    
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "something went wrong",
    });
  }
}

module.exports = { createstoreController, deletestoreController };
