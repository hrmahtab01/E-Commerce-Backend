function CreatecategoryController(req, res) {
  const { name, description, image } = req.body;
  res.send(req.body);
}

module.exports = { CreatecategoryController };
