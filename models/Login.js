const UserModel = require("./Users");
const bcrypt = require("bcrypt");
const nanoid = require("nanoid").nanoid;

const authenticateUser = async (req, res, username, password) => {
  const user = await UserModel.findOne({ username: username });

  if (user === null) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const isPasswordAMatch = await bcrypt.compare(password, user.password);

  if (isPasswordAMatch) {
    req.session.userId = nanoid();
    return res.status(201).json({ success: true, message: "User found" });
  }

  res
    .status(404)
    .json({ success: false, message: "Incorrect password. Please try again" });
};
module.exports = authenticateUser;
