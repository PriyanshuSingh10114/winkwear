const mongoose = require("mongoose");

const Users = mongoose.model("Users", {
  name: String,
  email: String,
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

module.exports = Users;
