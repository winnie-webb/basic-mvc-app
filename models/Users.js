const mongoose = require("mongoose");
const checkEmail = require("validator").isEmail;

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator(email) {
        return checkEmail(email);
      },
      message: "Not an email. Try again",
    },
  },

  username: {
    type: String,
    required: true,
    trim: true,
  },

  provider: {
    type: String,
    enum: ["local", "google"],
  },

  password: {
    type: String,
    required: () => this.provider === "local",
  },
  exercises: {
    type: Array,
  },
  chartData: {
    type: Array,
  },
});

const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
