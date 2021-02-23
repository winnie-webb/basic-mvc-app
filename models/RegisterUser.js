const User = require("./Users");

function registerUser(req, res, userData) {
  const user = new User(userData);
  user
    .save()
    .then(() => next())
    .catch(() => res.status(500).redirect("/register"));
}
module.exports = registerUser;
