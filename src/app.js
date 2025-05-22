const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json()); //middleware

//Signup user
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

//Find user by ID
app.get("/user/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    if (!userId) {
      res.status(404).send("User not found");
    } else {
      const user = await User.findById(userId);
      res.send(user);
    }
  } catch (err) {
    res.status(404).send("User not found");
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
    res.status(400).send("Something went wrong");
  }
});

//Delete user
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send("User deleted successfully");
    }
  } catch (err) {
    res.status(404).send("User not found");
  }
});

//update using patch
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
    });
    res.send("Updated successfully");
  } catch (err) {
    res.status(404).send("User not found");
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
