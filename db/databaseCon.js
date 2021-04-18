const mongoose = require("mongoose");

function dbConnection() {
  mongoose.connect("mongodb://localhost/usersDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  let database = mongoose.connection;
  database.on("open", () => {
    console.log("CONNECTED TO DATABASE");
  });
  database.on("error", (err) => {
    console.log(err);
  });
}

module.exports = dbConnection;
