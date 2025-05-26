const express = require("express");
const requestRouter = express.Router();
const User = require("../models/user");

const { userAuth } = require("../middlewares/auth");

const ConnectionRequest = require("../models/connectionRequest");

const sendEmail = require("../utils/sendEmail");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      // Check if the status is valid
      const isAllowedStatus = ["ignored", "interested"];

      if (!isAllowedStatus.includes(status)) {
        return res.status(400).send({
          message: "Invalid status type: " + status,
        });
      }

      //check if the toUserId is valid
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(400).send({
          message: "User not found with this id: " + toUserId,
        });
      }

      //check if connection request already exists
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res.status(400).send({
          message: "Connection request already exists!!!",
        });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      const emailRes = await sendEmail.run(
        "A new friend request from " + req.user.firstName,
        req.user.firstName + " is " + status + " in " + toUser.firstName,
      );
      console.log("Email sent successfully:", emailRes);

      res.json({
        message:
          req.user.firstName + " is " + status + " in " + toUser.firstName,
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR:" + err.message);
    }
  },
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];

      if (!allowedStatus.includes(status)) {
        return res.status(400).send({
          message: "Invalid status type: " + status,
        });
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      if (!connectionRequest) {
        return res.status(404).send({
          message: "Connection request not found with this id: " + requestId,
        });
      }

      connectionRequest.status = status;

      const data = await connectionRequest.save();

      res.json({
        message: loggedInUser.firstName + " has " + status + " the request",
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR:" + err.message);
    }
  },
);

module.exports = requestRouter;
