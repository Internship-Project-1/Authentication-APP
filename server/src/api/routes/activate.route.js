const express = require("express");

const controller = require("../controllers/user.controller");

const router = express.Router();

/**
 * @api {get} /activate
 * @apiDescription Activate user account
 */
router.route("/").get(controller.activateAccount);

module.exports = router;
