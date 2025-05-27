const express = require("express");
const { userAuth } = require("../middlewares/auth");
const paymentRouter = express.Router();
const razorpayInstance = require("../utils/razorpay");
const Payment = require("../models/payment");
const { membershipAmount } = require("../utils/constants");
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");
const User = require("../models/user");

// Create a new payment order using Razorpay
paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  try {
    const { membershipType } = req.body;

    const { firstName, lastName, emailId } = req?.user; // Get the authenticated user from the request

    const order = await razorpayInstance.orders.create({
      amount: membershipAmount[membershipType] * 100, // Amount in paise
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        firstName,
        lastName,
        emailId,
        membershipType: membershipType,
      },
    });

    //save it in my database
    const payment = new Payment({
      userId: req?.user?._id, // Get the user ID from the authenticated user
      orderId: order?.id,
      amount: order?.amount,
      currency: order?.currency,
      status: order?.status,
      receipt: order?.receipt,
      notes: order?.notes,
    });

    const savedPayment = await payment.save();

    // Return back my order details to frontend
    res.json({
      ...savedPayment.toJSON(),
      keyId: process.env.RAZORPAY_KEY_ID, // Send Razorpay key ID to the frontend
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Handle payment success and failure using Razorpay webhook
paymentRouter.post("/payment/webhook", async (req, res) => {
  try {
    const webhookSignature = req.get("X-Razorpay-Signature");

    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET,
    );

    if (!isWebhookValid) {
      return res.status(400).json({ message: "Invalid webhook signature" });
    }

    // Update my payment status in the database
    const paymentDetails = req.body.payload.payment.entity;

    const payment = await Payment.findOne({
      orderId: paymentDetails.order_id,
    });
    payment.status = paymentDetails.status; // Update the payment status

    await payment.save(); // Save the updated payment details

    const user = await User.findOne({
      _id: payment.userId,
    });

    user.isPremium = true; // Update the user to premium member

    user.membershipType = paymentDetails.notes.membershipType; // Set the membership type

    await user.save(); // Save the updated user details

    // Update the user as premium member if payment is successful

    // if (req.body.event === "payment.captured") {
    // }

    // if (req.body.event === "payment.failed") {
    // }

    res.status(200).json({ message: "Webhook received successfully" }); // Respond with success status
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

paymentRouter.get("/premium/verify", userAuth, async (req, res) => {
  const user = req.user.toJSON(); // Get the authenticated user from the request
  if (user.isPremium) {
    return res.json({
      ...user,
    });
  }
  return res.json({
    ...user,
  });
});

module.exports = paymentRouter;
