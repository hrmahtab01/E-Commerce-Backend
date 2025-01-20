const categoryModel = require("../Model/categoryModel");

async function CreatecategoryController(req, res) {
  const { name, description, image } = req.body;
  console.log(req.file);

  const category = await categoryModel.create({
    name,
    description,
    image: process.env.host_url + req.file.filename,
  });
  res
    .status(201)
    .send({ success: true, message: "category created successfully" });
}

module.exports = { CreatecategoryController };
