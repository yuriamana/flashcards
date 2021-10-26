var express = require("express");
var router = express.Router();

const CardModel = require("./../models/Card");
const UserModel = require("./../models/User");
const CategoryModel = require("./../models/Category");
const SerieModel = require("./../models/Serie")

router.get("/dashboard", (req, res, next) => {
  res.render("mySeries.hbs");
});

router.get("/dashboard/add", async (req, res, next) => {
    SerieModel.find()
    .then((series) => {
        res.render("/dashboard/add", { series })
    })
})
    
// Creer une serie -> Ajouter / creer de nouvelles cartes dans cette serie. (AJAX requests)
// Slect avec les series disponibles + tout les inputs necessaires a la carte


// Creer une serie. -> Creer une carte Select la serie ou creer la carte 

//     console.log(req.body)
//     CardModel.create(newCard)
//     .then(() => res.redirect("/dashboard"))
//     .catch((err) => {
//         console.log(err)
//         res.redirect("/dashboard/createCard")
//     })
// })

module.exports = router;
