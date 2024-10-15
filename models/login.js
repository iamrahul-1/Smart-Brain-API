const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
});

const Login = mongoose.model("Login", loginSchema);

module.exports = Login;
