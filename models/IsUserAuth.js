function redirectToSigninIfNotAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  return res.redirect("/auth/signin");
}
function redirectToHomeIfAlreadyAuth(req, res, next) {
  if (req.isAuthenticated()) return res.redirect("/");
  next();
}
module.exports = { redirectToHomeIfAlreadyAuth, redirectToSigninIfNotAuth };
