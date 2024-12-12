const express = require("express");
const app = express();
const cors = require("cors");
const env = require("dotenv").config();

app.use(cors());
app.use(express.json());

app.listen(process.env.port, () => {
  console.log("server is running on port " + process.env.port);
});
