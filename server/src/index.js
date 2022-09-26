const express = require("express");
const jwt = require("express-jwt");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("./mongoose");

// Import ENV Vars
require("dotenv").config({
  allowEmptyValues: true,
  path: path.resolve(__dirname, "../.env"),
});

const userRoutes = require("./api/routes/user.route");
const activateRoutes = require("./api/routes/activate.route");

const app = express();

// open mongoose connection
mongoose.connect();

app.use(cors());

app.set("view engine", "html");

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", userRoutes);
app.use("/activate", activateRoutes);

// listen to requests
app.listen(5000, () =>
  console.log(`server started on port 5000 (${process.env.NODE_ENV})`)
);

/**
 * Exports express
 * @public
 */
module.exports = app;
