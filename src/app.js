const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json()); //middleware

app.post("/signup", async (req, res) => {
  // Creating new instance of the User Model / Creating a new user with this data
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User added successfully!");
  } catch (err) {
    res.status(400).send("Error Saving User:" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection is success");
    app.listen(4444, () => {
      console.log("Server is successfully listening on port 4444");
    });
  })
  .catch((err) => {
    console.log("Database connection is failed");
  });
