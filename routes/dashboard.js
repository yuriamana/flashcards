var express = require("express");
var router = express.Router();

const CardModel = require("./../models/Card");
const UserModel = require("./../models/User");
const CategoryModel = require("./../models/Category");
const SerieModel = require("./../models/Serie");

router.get("/dashboard", async (req, res, next) => {
  const myId = req.session?.currentUser?._id;
  const mySeries = await SerieModel.find({ id_author: myId });

  res.render("dashboard/myLibrary.hbs", { mySeries });
});



// routes disponibles :
//   GET
// - /dashboard
// - /dashboard/add/serie
// - /dashboard/add/card

//   POST
// - /dashboard/add/serie
// - /dashboard/add/card
// - /dashboard/add/serie/card

router.get("/dashboard/add/card", async (req, res, next) => {
  try {
    const serie = await SerieModel.find();
    res.render("dashboard/createCard", { serie });
  } catch (err) {
    next(err);
  }
});

router.post("/dashboard/add/card", async (req, res, next) => {
  try {
    const { question, answer } = req.body;
    const id_author = req.session?.currentUser?._id;
    const newCard = await CardModel.create({ question, answer, id_author });
    const updateSerie = await SerieModel.findByIdAndUpdate(
      req.body.serie,
      { $push: { id_cards: newCard._id } },
      { new: true }
    );
    res.redirect("/dashboard");
  } catch (err) {
    next(err);
  }
});

router.get("/dashboard/add/serie", async (req, res, next) => {
  try {
    const categories = await CategoryModel.find();
    res.render("dashboard/createSerie", { categories });
  } catch (err) {
    next(err);
  }
});

router.post("/dashboard/add/serie", async (req, res, next) => {
  try {
    console.log(req.body);
    const { category, name } = req.body;
    const id_author = req.session?.currentUser?._id;
    const newSerie = await SerieModel.create({
      id_author,
      id_category: category,
      name,
    });
    console.log(newSerie);
    res.redirect("/dashboard");
  } catch (err) {
    next(err);
  }
});

router.get("/dashboard/edit/card/:id", async (req, res, next) => {
  try {
    const myId = req?.session?.currentUser?._id;
    const card = await CardModel.findById(req.params.id);
    if (card.id_author.toString() === myId.toString()) {
      res.render("dashboard/editCard.hbs", { card });
    } else {
      console.log("User did not wrote this card !");
    }
  } catch (err) {
    next(err);
  }
});

router.post("/dashboard/edit/card/:id", async (req, res, next) => {
  try {
    await CardModel.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/dashboard");
  } catch (err) {
    next(err);
  }
});

router.get("/dashboard/serie/:id", async (req, res, next) => {
  try {
    const serie = await SerieModel.findById(req.params.id).populate('id_cards')
    res.render('./dashboard/serie.hbs', {serie})
  } catch (err) {
    next(err);
  }
});

router.get("/dashboard/delete/card/:id", async (req, res, next) => {
  try{
    await CardModel.findByIdAndDelete(req.params.id)
    res.redirect("/dashboard")
  } catch (err) {
    next(err);
  }
})

// Creer une serie -> Ajouter / creer de nouvelles cartes dans cette serie. (AJAX requests)
// Slect avec les series disponibles + tout les inputs necessaires a la carte

// Creer une serie. -> Creer une carte Select la serie ou creer la carte


router.get('/dashboard/category/:id', async (req, res, next) => {
  try {
    const series = await SerieModel.find({id_category: req.params.id})
    res.json(series)
  } catch (err) {
    next(err)
  }
})

router.get("/game/:id", async (req, res, next) => {
  try {
    const serie = await SerieModel.findById(req.params.id).populate("id_cards")
    
    // shuffle cards
    function shuffle(cards) {
      for (let i = cards.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp; 
      }
    return cards
    }

    const cards = shuffle(serie.id_cards)
    res.render("dashboard/game.hbs", {serie, cards, script: ["cards.js"]})
    
  } catch (err) {
    next(err);
  }
})




module.exports = router;
