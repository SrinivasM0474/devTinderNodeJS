const express = require("express");

const app = express();

//This will only handle GET call to /user
app.get("/user", (req, res) => {
  res.send({ firstName: "srinivas", lastName: "M" });
});

app.post("/user", (req, res) => {
  console.log("Save data to the database");
  res.send("Data successfully saved to DB");
});

app.delete("/user", (req, res) => {
  res.send("Deleted successfully");
});

//this will match all the http method api calls to test
app.use("/test", (req, res) => {
  res.send("Hello from the server");
});

app.listen(4444, () => {
  console.log("Server is successfully listening on port 4444");
});
