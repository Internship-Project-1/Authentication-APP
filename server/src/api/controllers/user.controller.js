const bcrypt = require("bcryptjs");
const Users = require("../models/user.model");
const crypto = require("crypto");
const mailer = require("../service/mailer.service");

exports.userRegister = async (req, res, next) => {
  try {
    if (!req.body.email) {
      return res.status(500).json({
        message: "Incorrect Request. Please enter complete details",
      });
    }

    let userDetails = req.body;
    let { email } = userDetails;

    // Check account doesnt exist
    let registeredUser = await Users.findOne({ email }).exec();

    if (registeredUser) {
      return res.status(400).json({
        message: "Email is already registered. Please login",
      });
    }

    // Hash Password
    const rounds = 12;
    const hash = await bcrypt.hash(userDetails.password, rounds);
    userDetails.password = hash;

    const newUser = new Users({
      ...userDetails,
      isActivated: false,
    });

    // Email Logic
    crypto.randomBytes(10, async (err, buf) => {
      newUser.activationCode = Date.now() + buf.toString("hex");
      const link = `${process.env.BASE_URL}/activate?token=${userDetails.activationCode}`;

      mailer({
        to: userDetails.email,
        text: `Please click ${link} to activate your account`,
        html:
          'Please click <a href="' +
          link +
          '"> here </a> to activate your account.',
      });

      await newUser.save(async (err, user) => {
        if (err) {
          return res.status(400).json({
            message: "error " + err,
          });
        }

        return res.status(200).json({
          user,
          message:
            "User registration successful. Please check your email to verify your account",
        });
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Unable to create account",
    });
  }
};

exports.userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email not found. Invalid login credentials",
      });
    }

    const isMatch = await user.passwordMatches(password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect password. Please try again",
      });
    }
    let token = user.token();

    res.cookie("token", token, { httpOnly: true });

    if (!user.isActivated) {
      return res.status(400).json({
        message:
          "Your account has not been verified. Please check your email to verify your account",
      });
    }

    return res.status(200).json({
      token,
      user,
      message: "You are now logged in.",
    });
  } catch (err) {
    console.error("ERROR: ", err);
    next(err);
  }
};

exports.fetchDetails = async (req, res, next) => {
  try {
    const _id = req.params.userId;
    // Check account doesnt exist
    let registeredUser = await Users.findOne({ _id }).exec();

    if (!registeredUser) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      user: registeredUser,
      message: "User details found",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Unable to fetch the user details",
    });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { _id } = req.body;

    const query = { _id: mongoose.Types.ObjectId(_id) };

    await Users.findOneAndUpdate(
      query,
      { ...req.body },
      { new: true },
      (err, doc) => {
        if (err) {
          res.status(500);
          return res.json({ msg: `Unable to Update User: ${err}` });
        }

        return res.status(200).json(doc);
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to update user",
    });
  }
};

// Email Activation
exports.activateAccount = async (req, res, next) => {
  try {
    Users.findOne(
      {
        activationCode: req.query.token,
      },
      (err, user) => {
        if (err) {
          res.status(500);
          return res.json({
            message: `Unable to find user to activate. Error: ${err}`,
          });
        }
        if (!user) {
          return res.json({
            title: "Failed to Activate",
            content: "Your activation link is invalid, please register again.",
          });
        }

        user.isActivated = true;
        user.save((err, user) => {
          if (err) {
            res.status(500);
            return res.json({
              message: `Unable to save user after activation. Error: ${err}`,
            });
          }

          // activation success
          res.json({
            title: "Successfully Activated!",
            content: user.name + `may login now.`,
          });
        });
      }
    );
  } catch (err) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to activate account",
    });
  }
};
