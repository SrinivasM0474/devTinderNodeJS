const express = require("express");
const profileRouter = express.Router();
const validator = require("validator");
const bcrypt = require("bcrypt");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.user;
    if (req.body?.skills?.length > 4) {
      throw new Error("Add skills upto 4 only");
    }
    if (!validator.isURL(req.body?.photoUrl)) {
      throw new Error("URL not valid");
    }
    if (req.body?.about?.length > 100) {
      throw new Error("About should be less than 100 characters");
    }
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.send({
      message: `${loggedInUser.firstName}, your profile updated successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const loggedInUser = req.user;
    const isPasswordValid = await loggedInUser.validatePassword(oldPassword);
    if (!isPasswordValid) {
      throw new Error("Existing password is not valid");
    }
    if (!validator.isStrongPassword(newPassword)) {
      throw new Error("Enter Strong Password");
    } else {
      const passwordHash = await bcrypt.hash(newPassword, 10);
      loggedInUser.password = passwordHash;
      await loggedInUser.save();
      res.send("Password updated successfully");
    }
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

module.exports = profileRouter;
