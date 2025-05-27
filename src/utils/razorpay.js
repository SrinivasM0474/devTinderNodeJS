const Razorpay = require("razorpay");

var instance = new Razorpay({
  key_id: "process.env.RAZORPAY_KEY_ID", //comes from Razorpay dashboard
  key_secret: "process.env.RAZORPAY_KEY_SECRET", //comes from Razorpay dashboard
});

module.exports = instance;
