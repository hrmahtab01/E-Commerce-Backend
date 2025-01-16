const { default: mongoose } = require("mongoose");

const categoryschema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      require: true,
    },
    product: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const categoryModel = mongoose.model("Category", categoryschema);
module.exports = categoryModel;
