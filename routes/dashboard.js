var express = require('express');
var router = express.Router();

const CardModel = require("./../models/Card");
const UserModel = require("./../models/User");
const CategoryModel = require("./../models/Category");


router.get("/",  (req, res, next) =>  {
console.log("LaTeam");
     res.render("myCategories.hbs") 
    });


module.exports = router