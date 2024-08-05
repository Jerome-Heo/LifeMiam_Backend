var express = require('express');
var router = express.Router();

const { checkBody } = require('../modules/checkBody');

const URL = "http://localhost:3000";

/* GET recipes listing with parameters. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
