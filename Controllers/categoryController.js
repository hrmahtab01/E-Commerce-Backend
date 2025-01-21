const categoryModel = require("../Model/categoryModel");

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

module.exports = { CreatecategoryController };
