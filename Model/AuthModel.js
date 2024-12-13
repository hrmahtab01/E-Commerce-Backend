const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  lastlogin: {
    type: Date,
    default: Date.now,
  },
  isverifyed: {
    type: Boolean,
    default: false,
  },
  resetpasswordtoken: String,
  resetpasswordexpire: String,
  verificationtoken: String,
  verificationexpire: String,
});

const auth = mongoose.model("auth", authSchema);

module.exports =auth