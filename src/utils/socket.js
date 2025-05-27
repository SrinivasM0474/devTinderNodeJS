const socket = require("socket.io");
const crypto = require("crypto");

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

  io.on("connection", (socket) => {
    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      const roomId = getSecretRoomId(userId, targetUserId);
      //   console.log(firstName + " Joined room:", roomId);
      socket.join(roomId);
    });

    socket.on("sendMessage", ({ firstName, userId, targetUserId, text }) => {
      const roomId = getSecretRoomId(userId, targetUserId);
      //   console.log(
      //     `Message from ${firstName} (${userId}) to ${targetUserId}: ${text}`,
      //   );
      io.to(roomId).emit("messageReceived", {
        firstName,
        userId,
        targetUserId,
        text,
      });
    });

    socket.on("disconnect", () => {});
  });
};

module.exports = { initializeSocket };
