const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

//Get all pending connection requests for the loggedin user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequestModel.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);
    // }).populate("fromUserId", ["firstName", "lastName"]);

    if (!connectionRequests) {
      return res.status(400).send({
        message: "No connection requests found",
      });
    }
    res.json({
      message: "Data Fetched successfully",
      connectionRequests,
    });
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionsRequests = await ConnectionRequestModel.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    if (!connectionsRequests) {
      return res.status(400).send({
        message: "No connections found",
      });
    }
    const data = connectionsRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    res
      .json({
        message: "Connections Fetched successfully",
        data,
      })
      .populate("toUserId", "firstName lastName");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = userRouter;
