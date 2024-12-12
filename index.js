const express = require("express");
const app = express();
const env = require("dotenv").config();
const cors = require("cors");
const router  = require("./Router");

app.use(cors());
app.use(express.json());
app.use(router)



app.listen(process.env.port, () => {
  console.log("server is running on port " + process.env.port);
});
