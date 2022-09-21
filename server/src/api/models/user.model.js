const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  username: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  userImage: {
    type: String,
    trim: true,
  },
  mobileNumber: {
    type: String,
    trim: true,
  },
  googleOAuth: {
    type: String,
    trim: true,
  },
  activationCode: {
    type: String,
    trim: true,
  },
  isActivated: {
    type: Boolean,
    default: false,
  },
});

/**
 * @typedef User
 */
module.exports = mongoose.model("User", userSchema);
