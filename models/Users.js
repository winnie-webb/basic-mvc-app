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
  },

  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("Users", UserSchema);

module.exports = User;
