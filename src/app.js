const express = require("express");

const app = express();

app.use("/test", (req, res) => {
  res.send("Hello from the server");
});

app.use("/hello", (req, res) => {
  res.send("Hello Hello");
});

app.use("/", (req, res) => {
  res.send("Hello welcome node ");
});

app.listen(4444, () => {
  console.log("Server is successfully listening on port 4444");
});
