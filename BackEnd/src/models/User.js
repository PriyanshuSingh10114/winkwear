const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true,
    lowercase: true,
  },
  password: String,

  phone: String,
  gender: String,
  dob: Date,

  avatar: {
    type: String,
    default: "",
  },

  lastLogin: Date,

  cartData: Object,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Users", UserSchema);

