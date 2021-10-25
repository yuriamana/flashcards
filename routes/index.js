var express = require('express');
var router = express.Router();

const CardModel = require("./../models/Card");
const UserModel = require("./../models/User");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Flashcards' });
});




module.exports = router;
