const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://snmsv0474:TlWi9cIX86LUyJWp@namastenode.btl7myt.mongodb.net/devTinder",
  );
};

module.exports = { connectDB };
