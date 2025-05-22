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

//Feed API - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Somethign went wrong");
  }
});

//Get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
    // const users = await User.find({ emailId: userEmail }); //it will give all the users with same emailId
    // if (users.length === 0) {
    //   res.status(404).send("User not found");
    // } else {
    //   res.send(users);
    // }
  } catch (err) {
    res.status(400).send("Somethign went wrong");
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
