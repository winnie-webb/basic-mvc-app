const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  username: String,
  log: [
    {
      description: {
        type: String,
        required: true,
      },
      duration: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
    },
  ],
});

const Exercise = mongoose.model("Excercise", ExerciseSchema);

module.exports = Exercise;
