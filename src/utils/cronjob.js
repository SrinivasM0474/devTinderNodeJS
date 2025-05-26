const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const sendEmail = require("../utils/sendEmail");
const ConnectionRequestModel = require("../models/connectionRequest");

//This job will run every day at 8 AM
cron.schedule("0 8 * * *", async () => {
  console.log("Running a task every minute!!!" + new Date());
  //Send emails to all people who got requests the previous day
  // Add your task logic here
  try {
    const yesterday = subDays(new Date(), 1);
    const yesterDayStart = startOfDay(yesterday);
    const yesterDayEnd = endOfDay(yesterday);

    const pendingRequestsOfYesterday = await ConnectionRequestModel.find({
      status: "interested",
      createdAt: {
        $gte: yesterDayStart,
        $lt: yesterDayEnd,
      },
    }).populate("fromUserId toUserId");

    const listOfEmails = [
      ...new Set(
        pendingRequestsOfYesterday.map((request) => request.toUserId.email),
      ),
    ]; // Extract unique emails from the requests

    for (const email of listOfEmails) {
      try {
        const res = await sendEmail.run(
          "New Friend Request pending for " + email,
          "There are so many friend requests pending for you. Please check your account to see the details.",
        );
      } catch (error) {
        console.error(`Failed to send email to ${email}:`, error);
      }
    }
  } catch (error) {
    console.error("Error executing cron job:", error);
  }
});
