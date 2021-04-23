if (process.env.NODE_ENV !== "production") require("dotenv").config();

async function ConnectToDb() {
  const mongoose = require("mongoose");

  const { DB_URI } = process.env;
  try {
    await mongoose.connect(DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Connected To Db");
  } catch (err) {
    console.log("Connection Not Established");
  }
}
module.exports = ConnectToDb;
