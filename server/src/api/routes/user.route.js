const express = require("express");

const controller = require("../controllers/user.controller");

const router = express.Router();

/**
 * @api {post} user/register
 * @apiDescription Register with Email
 */
router.route("/register").post(controller.userRegister);

/**
 * @api {post} user/login
 * @apiDescription Login with Email
 */
router.route("/login").post(controller.userLogin);

module.exports = router;
