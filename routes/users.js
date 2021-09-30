/*FileName: users.js
Author: Arshad Khan
Student#: 301180776
Date: September 27*/
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Placeholder');
});

module.exports = router;
