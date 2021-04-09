function redirectToSigninIfNotAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/signin");
}
function redirectToDashboardIfAlreadyAuth(req, res, next) {
  if (req.isAuthenticated()) return res.redirect("/dashboard");
  next();
}
function redirectToHomeIfNoAuth(req, res, next) {
  if (req.isAuthenticated()) return res.redirect("/");
  next();
}

module.exports = {
  redirectToDashboardIfAlreadyAuth,
  redirectToSigninIfNotAuth,
  redirectToHomeIfNoAuth,
};
