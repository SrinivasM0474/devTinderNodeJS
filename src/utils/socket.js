const socket = require("socket.io");
const crypto = require("crypto");
const Chat = require("../models/chat");
const ConnectionRequest = require("../models/connectionRequest");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const getSecretRoomId = (userId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("_@#@#@#_"))
    .digest("hex");
};
const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173", // React app URL
    },
  });

  io.on("connection", async (socket) => {
    //check token is valid or not
    const token = socket.handshake.auth.token;
    const decodedObj = jwt.verify(token, "DEV@Tinder$474");
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    // console.log("TOKEN", token);
    // console.log("USER", user);
    if (!user) {
      return;
    }

    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      const roomId = getSecretRoomId(userId, targetUserId);
      // console.log(firstName + " Joined room:", roomId);
      socket.join(roomId);
    });

    socket.on(
      "sendMessage",
      async ({ firstName, lastName, userId, targetUserId, text }) => {
        //   console.log(
        //     `Message from ${firstName} (${userId}) to ${targetUserId}: ${text}`,
        //   );
        //Save message to database here if needed
        try {
          const roomId = getSecretRoomId(userId, targetUserId);

          //check if userId & targetUserId are friends
          const isFriends = await ConnectionRequest.findOne({
            $or: [
              {
                fromUserId: userId,
                toUserId: targetUserId,
                status: "accepted",
              },
              {
                fromUserId: targetUserId,
                toUserId: userId,
                status: "accepted",
              },
            ],
          });
          // console.log("isFriends", isFriends);

          if (!isFriends) {
            return;
          }

          let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
          });
          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }
          chat.messages.push({
            senderId: userId,
            text,
          });
          await chat.save();
          io.to(roomId).emit("messageReceived", {
            firstName,
            lastName,
            text,
          });
        } catch (error) {
          console.error("Error saving message to database:", error);
        }
      },
    );

    socket.on("disconnect", () => {});
  });
};

module.exports = { initializeSocket };
