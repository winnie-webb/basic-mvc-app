const User = require("./Users");
const bcrypt = require("bcrypt");
async function registerUser(req, res, userData) {
  try {
    const { password, email, username } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email: email,
      username: username,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).send();
  } catch (err) {
    res.status(500).json(err.message);
  }
}
module.exports = registerUser;
