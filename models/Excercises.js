const mongoose = require("mongoose");

const ExcersiseSchema = new mongoose.Schema({
  name: String,
});

const Excercise = mongoose.model("Excercise", ExcersiseSchema);

module.exports = Excercise;
