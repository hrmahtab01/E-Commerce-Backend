const { MongoGCPError } = require("mongodb");
const mongoose = require("mongoose");

const StoreSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    image: {
      required: true,
      type: String,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    location: {
      type: String,
    },
    contact: {
      type: String,
    },
  },
  {
    Timestamps: true,
  }
);

const StoreModel = mongoose.model("Store", StoreSchema);
module.exports = StoreModel;
