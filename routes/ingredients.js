var express = require('express');
var router = express.Router();

const Ingredient = require('../models/ingredients');
const { checkBody } = require('../modules/checkBody');


/* GET ingredient by id */
router.get('/:id', function(req, res) {

  if (!checkBody(req.params, ['id'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  Ingredient.find({id : req.params.id})
  .then((data)=> {
    res.json('ok');
  })
  
});

router.get('/:category', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:regime', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
