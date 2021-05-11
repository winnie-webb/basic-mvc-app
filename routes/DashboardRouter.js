if (process.env.NODE_ENV !== "production") require("dotenv").config();

const { redirectToSigninIfNotAuth } = require("../models/IsUserAuth");
const UserModel = require("../models/Users");
const express = require("express");
const router = require("express").Router();
router.get("/", redirectToSigninIfNotAuth, async (req, res) => {
  const { fromMySite } = req.query;
  if (fromMySite) {
    const { demoUsername } = process.env;
    return res.redirect(`/dashboard/${demoUsername}?fromMySite=true`);
  }
  const user = await UserModel.findOne({ _id: req.user });
  res.redirect(`/dashboard/${user.username}`);
});
router.use("/:username", express.static("public/dashboard"));
router.get("/:username", redirectToSigninIfNotAuth, async (req, res) => {
  res.render("dashboard.ejs");
});
router.patch(
  "/:username/exercises",
  redirectToSigninIfNotAuth,
  async (req, res) => {
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
      console.log(err);
      res.json({ saved: false });
    }
  }
);

router.delete(
  "/:username/exercises",
  redirectToSigninIfNotAuth,
  async (req, res) => {
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
  }
);
router.get(
  "/:username/exercises",
  redirectToSigninIfNotAuth,
  async (req, res) => {
    try {
      const user = await UserModel.findOne({ _id: req.user });
      if (!user) res.redirect("/auth/signin");
      res.json({ exercises: user.exercises });
    } catch (err) {
      console.log(err);
    }
  }
);

router.patch(
  "/:username/chartdata",
  redirectToSigninIfNotAuth,
  async (req, res) => {
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
  }
);
router.get(
  "/:username/chartdata",
  redirectToSigninIfNotAuth,
  async (req, res) => {
    const user = await UserModel.findOne({ _id: req.user });
    res.json({ chartData: user.chartData });
  }
);
router.get("/:username/logout", redirectToSigninIfNotAuth, async (req, res) => {
  try {
    req.logout();
    res.send({ loggedOut: true });
  } catch (err) {
    res.send({ loggedOut: false });
  }
});
module.exports = router;
