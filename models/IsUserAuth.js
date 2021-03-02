function checkIfUserIsAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/signin");
}
module.exports = checkIfUserIsAuth;
