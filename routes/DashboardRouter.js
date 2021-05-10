const { redirectToSigninIfNotAuth } = require("../models/IsUserAuth");
const UserModel = require("../models/Users");
const express = require("express");
const router = require("express").Router();

router.get("/", redirectToSigninIfNotAuth, async (req, res) => {
  const user = await UserModel.findOne({ _id: req.user });

  res.redirect(`/dashboard/${user.username}`);
});
router.use("/:username", express.static("public/dashboard"));
router.get("/:username", redirectToSigninIfNotAuth, async (req, res) => {
  res.render("dashboard.ejs");
});
router.patch("/:username/exercises", async (req, res) => {
  const { exercises } = req.body;
  console.log(exercises);
  try {
    const user = await UserModel.findOne({
      _id: req.user,
    });
    user.exercises = exercises;
    await user.save();
    res.json({ saved: true });
  } catch (err) {
    console.log(err)
    res.json({ saved: false });
  }
});

router.delete("/:username/exercises", async (req, res) => {
  const { exercises } = req.body;
  console.log(exercises);
  try {
    const user = await UserModel.findOne({
      _id: req.user,
    });
    user.exercises = exercises;
    await user.save();
    res.json({ saved: true });
  } catch (err) {
    res.json({ saved: false });
  }
});
router.get("/:username/exercises", async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.user });
    if (!user) res.redirect("/auth/signin");
    console.log("Get exercises")
    res.json({ exercises: user.exercises });
  } catch (err) {
    console.log(err);
  }
});

router.patch("/:username/chartdata", async (req, res) => {
  const { chartData } = req.body;
  try {
    const user = await UserModel.findOne({
      _id: req.user,
    });
    user.chartData = chartData;
    await user.save();
    res.json({ saved: true });
  } catch (err) {
    res.json({ saved: false });
  }
});
router.get("/:username/chartdata", async (req, res) => {
  const user = await UserModel.findOne({ _id: req.user });
  res.json({ chartData: user.chartData });
});
router.get("/:username/logout", (req, res) => {
  try {
    req.logout();
    res.send({ loggedOut: true });
  } catch (err) {
    res.send({ loggedOut: false });
  }
});
module.exports = router;
