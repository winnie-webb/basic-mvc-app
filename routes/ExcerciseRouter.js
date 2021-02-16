const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("index", { greeting: "Hello there" });
});
module.exports = router;
