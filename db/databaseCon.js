const mongoose = require("mongoose");

function dbConnection() {
  mongoose.connect(
    "mongodb+srv://antonia91:Luna@cluster0.ekwli.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log("CONNECTED");
    }
  );
}
module.exports = dbConnection;
