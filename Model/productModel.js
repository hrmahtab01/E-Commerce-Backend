const { default: mongoose } = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  image: {
    type: [],
    required: true,
  },
  sellingprice: {
    type: Number,
    required: true,
  },
  discoundprice: {
    type: Number,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  review: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  rating: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rating",
    },
  ],
  quantity: {
    type: Number,
  },
});

const productModel = mongoose.model("Product", productSchema);
module.exports = productModel;
