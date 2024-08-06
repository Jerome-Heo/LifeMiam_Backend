var express = require('express');
var router = express.Router();

const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');
const { checkRegime } = require('../modules/checkRegime');

// UID2
const uid2 = require('uid2');
// A redéfinir plus tard SERT d'exemple
const token = uid2(32);

// BCrypt
const bcrypt = require('bcrypt');
// A redéfinir plus tard SERT d'exemple
const hash = bcrypt.hashSync('password', 10);

// Sign In for the user
router.post('/signin', (req, res) => {
  if (!checkBody(req.body, ['username', 'password' ])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  User.findOne({ username: req.body.username }).then(data => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, token: data.token });
    } else {
      res.json({ result: false, error: 'User not found or wrong password' });
    }
  });
});

router.post('/signup', (req, res) => {
  if (!checkBody(req.body, ['username', 'email', 'password' ])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  // Need to fix the issue
  if (!checkRegime(req.body.regime)) {
    res.json({ result: false, error: 'Wrong regime fields' });
    return;
  }

  // Check if the user has not already been registered
  User.findOne({ username: req.body.username }).then(data => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      console.log(req.body.regime);

      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        token: uid2(32),
        regime: req.body.regime,
        signup_date: Date.now(),
        menus: [],
      });

      newUser.save().then(newDoc => {
        res.json({ result: true, token: newDoc.token });
      });
    } else {
      // User already exists in database
      res.json({ result: false, error: 'User already exists' });
    }
  });
});

module.exports = router;
