const express = require("express");
const app = express();
const env = require("dotenv").config();
const cors = require("cors");
const router = require("./Router");
const dbconnect = require("./dbConnect/db.config");
const cookieParser = require("cookie-parser");

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use("/uploads", express.static("./uploads"));




const port = process.env.port;


app.listen(port, () => {
  dbconnect();
  console.log("server is running on port " + port);
});
