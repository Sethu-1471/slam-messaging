const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const setting = require("../config/setting");

const register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, async (err, hashedPwd) => {
    if (err) {
      res.json({
        status: false,
        message: "Error while registering & password",
        err,
      });
    }

    if (!req.body.username || !req.body.phone || !hashedPwd) {
      res.json({
        status: false,
        message: "Some Fields are unfilled",
      });
    }
    // New User
    let newUser = new User({
      name: req.body.username,
      contact: req.body.phone,
      password: hashedPwd,
    });

    try {
      let userCheck = await User.findOne({ contact: req.body.phone });
      if (userCheck) {
        res.json({
          status: false,
          message: "Phone is already registered",
        });
      } else {
        newUser
          .save()
          .then((user) => {
            res.status(200).json({
              status: true,
              message: "User Registered",
            });
          })
          .catch((err) => {
            res.json({
              status: false,
              message: "Error while registering. Try again",
              err,
            });
          });
      }
    } catch (err) {
      res.json({
        status: false,
        message: "Error while registering. Try again",
        err,
      });
    }
  });
};

const login = (req, res, next) => {
  let username = req.body.phone;
  let password = req.body.password;

  User.findOne({ contact: username }).then((user) => {
    if (user.socket) {
      return res.status(406).json({
        status: false,
        message: "Account Already logged In Somewhere",
      });
    }
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
         return res.status(406).json({
            status: false,
            message: "Some Mistake in password" + err,
          });
        }
        if (result) {
          let token = jwt.sign({ name: user.name }, setting.secret, {
            expiresIn: "24h",
          });
          res.setHeader("auth-token", token);
         return  res.json({
            status: true,
            message: "logged in",
            token: token,
            user: user,
          });
        } else {
          res.status(406).json({
            status: false,
            message: "Password Does not match",
          });
        }
      });
    } else {
      res.status(404).json({
        status: false,
        message: "no user found",
      });
    }
  });
};

module.exports = { register, login };
