const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 100,
    },
    lastName: {
      type: String,
      minLength: 4,
      maxLength: 100,
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      // match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalied Email Address " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 10,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error(
            "Enter a Strong Password { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}" +
              value,
          );
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://liccar.com/wp-content/uploads/png-transparent-head-the-dummy-avatar-man-tie-jacket-user.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalied Email Address " + value);
        }
      },
    },
    about: {
      type: String,
      default: "This is default about of the user!!!",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  },
);

// const User = mongoose.model("User", userSchema);

module.exports = mongoose.model("User", userSchema);
