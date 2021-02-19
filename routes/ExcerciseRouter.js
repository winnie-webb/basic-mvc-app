const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("index", { greeting: "Hello there" });
});
router.get("/signin", (req, res) => {
  res.render("signin");
});
module.exports = router;
