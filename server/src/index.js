const express = require("express");
const jwt = require("express-jwt");
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("./mongoose");

const Users = require("./api/models/user.model");

// Import ENV Vars
require("dotenv").config({
  allowEmptyValues: true,
});

const app = express();

// open mongoose connection
mongoose.connect();

// Testing
// Users.create({ name: "Test", password: "123" });

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// listen to requests
app.listen(5000, () => `server started on port 5000 (${process.env.NODE_ENV})`);

/**
 * Exports express
 * @public
 */
module.exports = app;
