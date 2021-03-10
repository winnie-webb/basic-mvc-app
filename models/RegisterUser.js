const UserModel = require("./Users");
const bcrypt = require("bcrypt");
async function registerUser(req, res, userData) {
  try {
    const { password, email, username } = userData;

    const doesUsernameAlreadyExist = await UserModel.findOne({
      username: username,
    });
    const doesEmailAlreadyExists = await UserModel.findOne({ email: email });

    if (doesEmailAlreadyExists !== null) {
      return res.status(409).json({ message: "Email already exists" });
    }

    if (doesUsernameAlreadyExist !== null) {
      return res.status(409).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      email: email,
      username: username,
      password: hashedPassword,
      provider: "local",
    });

    await user.save();
    res.status(201).send();
  } catch (err) {
    res.status(400).send(err.message);
  }
}
module.exports = registerUser;
