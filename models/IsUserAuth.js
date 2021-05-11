function redirectToSigninIfNotAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  const { fromMySite } = req.query;
  if (fromMySite) return next();
  res.redirect("/auth/signin");
}
function redirectToDashboardIfAlreadyAuth(req, res, next) {
  if (req.isAuthenticated()) return res.redirect("/dashboard");
  next();
}

module.exports = {
  redirectToDashboardIfAlreadyAuth,
  redirectToSigninIfNotAuth,
};
