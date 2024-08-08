var express = require("express");
var router = express.Router();

const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");
const { checkRegime } = require("../modules/checkRegime");

// UID2
const uid2 = require("uid2");
const token = uid2(32);

// BCrypt
const bcrypt = require("bcrypt");
const hash = bcrypt.hashSync("password", 10);

// Sign In for the user
router.post("/signin", (req, res) => {
  if (!checkBody(req.body, ["signin", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  // We are looking to find a match for username or email in the database
  User.findOne({
    $or: [{ username: req.body.signin }, { email: req.body.signin }],
  }).then((data) => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, token: data.token });
    } else {
      res.json({ result: false, error: "User not found or wrong password" });
    }
  });
});

router.post("/update", (req, res) => {
  if (!checkBody(req.body, ["token"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }
  if (!checkRegime(req.body.regime)) {
    res.json({ result: false, error: "Wrong regime fields" });
    return;
  }

  User.findOne({ token: req.body.token }).then((data) => {
    if (data) {
      User.updateOne(
        { token: req.body.token },
        { regime: req.body.regime }
      ).then((result) => {
        result.modifiedCount >= 1
          ? res.json({ result: true })
          : res.json({
              result: false,
              error: "User document found, no update needed",
              data,
            });
      });
    } else {
      res.json({ result: false, error: "User not found" });
    }
  });
});

router.post("/signup", (req, res) => {
  // We check if username / email / password is empty
  if (!checkBody(req.body, ["username", "email", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  // We check if regime is matching our value (on a string or an object)
  if (!checkRegime(req.body.regime)) {
    res.json({ result: false, error: "Wrong regime fields" });
    return;
  }

  // Check if the username and email has not already been registered
  User.findOne({
    $or: [{ username: req.body.username }, { email: req.body.email }],
  }).then((data) => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        token: uid2(32),
        regime: req.body.regime,
        signup_date: Date.now(),
        menus: [],
      });

      newUser.save().then((newDoc) => {
        // User added in the database
        res.json({ result: true, token: newDoc.token });
      });
    } else {
      // User already exists in database
      res.json({ result: false, error: "User already exists" });
    }
  });
});

module.exports = router;
