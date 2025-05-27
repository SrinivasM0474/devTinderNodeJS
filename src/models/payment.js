const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User", // Reference to the user model
      required: true, // Ensure that userId is provided
    },
    paymentId: {
      type: String,
    },
    orderId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      //   enum: ["created", "paid", "failed", "refunded"],
      //   default: "created", // Default status when the payment is created
    },
    receipt: {
      type: String,
      required: true, // Optional field for receipt information
    },
    notes: {
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      membershipType: {
        type: String,
      },
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  },
);

module.exports = mongoose.model("payment", paymentSchema); // 'payments' is the collection name in MongoDB
