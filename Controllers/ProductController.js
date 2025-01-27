const productModel = require("../Model/productModel");
const categoryModel = require("../Model/categoryModel");

async function createproductController(req, res) {
  const { name, description, sellingprice, discountprice, category } = req.body;

 
  const image = req.files.map((img)=>img.filename)

//   if (!name || !description || !sellingprice || !discountprice || !category) {
//     return res.status(400).send({ error: "All fields are required" });
//   }

  const categoryid = categoryExist._id;
  try {
    const product = await productModel.create({
      name,
      description,
      sellingprice,
      discountprice,
      category:categoryid,
      image:process.env.host_url+image
    });
    return res
      .status(201)
      .send({
        success: true,
        message: "product created successfully",
        data: product,
      });
  } catch (error) {
    res
      .status(500)
      .send({
        success: false,
        message: error.message || "something went wrong",
      });
  }
}

module.exports = { createproductController };
