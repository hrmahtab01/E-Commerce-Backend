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
    type: Array,
    required: true,
  },
  sellingprice: {
    type: Number,
    required: true,
  },
  discountprice : {
    type: Number,
  },
  category:
    {
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
    default:0,
  },
},{
    Timestamps:true
});

const productModel = mongoose.model("Product", productSchema);
module.exports = productModel;
