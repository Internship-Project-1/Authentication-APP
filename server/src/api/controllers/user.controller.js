const bcrypt = require("bcryptjs");
const Users = require("../models/user.model");

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
