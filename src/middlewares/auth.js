const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  //Read the token from req cookies
  try {
    const { token } = req.cookies;
    if (!token) {
      res.status(401).send("Please login to continue!!!");
    }
    const decodedObj = await jwt.verify(token, "DEV@Tinder$474"); //secret
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = { userAuth };
