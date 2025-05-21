const express = require("express");

const app = express();

//All are similar wraaping inside an array
// app.use("/route", rh1, rh2, rh3, rh4, rh5);
// app.use("/route", [rh1, rh2, rh3, rh4, rh5]);
// app.use("/route", [rh1, rh2], rh3, rh4, rh5);
// app.use("/route", rh1, rh2, [rh3, rh4], rh5);

app.get("/user", [
  (req, res, next) => {
    //route handler
    console.log("Route 1");
    next();
  },
  (req, res, next) => {
    console.log("Route 2");
    // res.send("Response 2");
    next();
  },
  (req, res, next) => {
    console.log("Route 3");
    // res.send("Response 3");
    next();
  },
  (req, res, next) => {
    console.log("Route 4");
    // res.send("Response 4");
    next();
  },
  (req, res, next) => {
    console.log("Route 5");
    res.send("Response 5");
  },
]);

app.listen(4444, () => {
  console.log("Server is successfully listening on port 4444");
});
