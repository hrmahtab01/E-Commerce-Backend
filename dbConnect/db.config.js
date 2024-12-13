const mongoose = require("mongoose");

function dbconnect() {
  mongoose
    .connect(process.env.db_url)
    .then(() => {
      console.log("db is connected");
    })
    .catch((error) => {
      console.log("somethning went wrong in db connection");
    });
}

module.exports = dbconnect
