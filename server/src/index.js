const express = require("express");
const jwt = require("express-jwt");
const bodyParser = require("body-parser");
const mongoose = require("./mongoose");

const userRoutes = require("./api/routes/user.route");

// Import ENV Vars
require("dotenv").config({
  allowEmptyValues: true,
});

const app = express();

// open mongoose connection
mongoose.connect();

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", userRoutes);

// listen to requests
app.listen(5000, () =>
  console.log(`server started on port 5000 (${process.env.NODE_ENV})`)
);

/**
 * Exports express
 * @public
 */
module.exports = app;
