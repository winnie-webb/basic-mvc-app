async function ConnectToDb() {
  const mongoose = require("mongoose");
  require("dotenv").config();

  const { DB_URI } = process.env;
  try {
    await mongoose.connect(DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Connected To Db");
  } catch (err) {
    return err.message;
  }
}
module.exports = ConnectToDb;
