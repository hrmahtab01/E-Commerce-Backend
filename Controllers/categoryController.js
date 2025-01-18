function CreatecategoryController(req, res) {
  const { name, description, image } = req.body;
  console.log(req.file);
  

  res.send(req.body);
}

module.exports = { CreatecategoryController };
