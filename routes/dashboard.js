var express = require("express");
var router = express.Router();

const CardModel = require("./../models/Card");
const UserModel = require("./../models/User");
const CategoryModel = require("./../models/Category");

router.get("/dashboard", (req, res, next) => {
  res.render("myCategories.hbs");
});

router.get("/create", async (req, res, next) => {
    const user = await UserModel.find()
    const serie = await SerieModel.find()
    res.render("dashboard", { user, serie })
    console.log(req.body)
    CardModel.create(newCard)
    .then(() => res.redirect("/dashboard"))
    .catch((err) => {
        console.log(err)
        res.redirect("/dashboard/createCard")
    })
})

module.exports = router;
