const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config(); // Load environment variables from .env file
require("./utils/cronjob"); // Import cron job utility

app.use(express.json()); //middleware
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // React app URL
    credentials: true, // Allow cookies to be sent
  }),
);

//Routes
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const paymentRouter = require("./routes/payment");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", paymentRouter);

connectDB()
  .then(() => {
    console.log("Database connection is success");
    app.listen(process.env.PORT, () => {
      console.log("Server is successfully listening on port 4444");
    });
  })
  .catch((err) => {
    console.log("Database connection is failed");
  });
