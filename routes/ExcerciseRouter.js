const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("index", { greeting: "Hello there" });
});
router.get("/signin", (req, res) => {
  res.render("signin", { formType: "signin", formAction: "/" });
});
router.get("/register", (req, res) => {
  res.render("signin", { formType: "signup", formAction: "/signin" });
});
module.exports = router;
