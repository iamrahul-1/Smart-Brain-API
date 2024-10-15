const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  entries: {
    type: Number,
    default: 0,
  },
  password: {
    type: String,
    required: true,
  },
  joined: {
    type: Date,
    default: Date.now,
  },
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
