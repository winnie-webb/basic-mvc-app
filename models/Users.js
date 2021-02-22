const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate(email) {
      return validator.isEmail(email);
    },
  },
});

const User = mongoose.model("Users", UserSchema);

module.exports = User;
