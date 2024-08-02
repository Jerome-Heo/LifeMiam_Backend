var express = require('express');
var router = express.Router();

const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');

// UID2
const uid2 = require('uid2');
// A redéfinir plus tard SERT d'exemple
const token = uid2(32);

// BCrypt
const bcrypt = require('bcrypt');
// A redéfinir plus tard SERT d'exemple
const hash = bcrypt.hashSync('password', 10);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
