const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

//Handle Auth Middleware for all requests GET,POST,PATCH, PUT, DELETE... requests
app.use("/admin", adminAuth);

app.get("/user", userAuth, (req, res) => {
  res.send("User data sent");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("All Data sent");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted a user");
});

app.listen(4444, () => {
  console.log("Server is successfully listening on port 4444");
});
