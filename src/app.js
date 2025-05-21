const express = require("express");

const app = express();

app.use("/", (err, req, res, next) => {
  if (err) {
    //Log your error
    res.status(500).send("something went wr0ng");
  }
});

app.get("/getUserData", (req, res) => {
  try {
    //Logic to get userdata from DB
    throw new Error("error");
    // res.send("User data sent");
  } catch (err) {
    res.status(500).send("Error occured");
  }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    //Log your error
    res.status(500).send("something went wr0ng");
  }
});

app.listen(4444, () => {
  console.log("Server is successfully listening on port 4444");
});
