require("dotenv").config();
require("./../../config/mongo"); //fetch the db connection
const CardModel = require("./../../models/Card");
const UserModel = require("./../../models/User")
const SerieModel = require("./../../models/Serie");
// const Categorymodel = require("./../../models/Category");
// const Seriemodel = require("./../../models/Serie");
const cards = [
    {
        question : "What is the traditional breakfast in France?",
        answer : "Croissant and coffee",
    },
    {
        question : "Who is Roland Garros?",
        answer : "a French pioneering aviator and fighter pilot during World War",
    },
    {
        question : "What JSON stands for?",
        answer : "JavaScript Object Notation",
    },
    {
        question : "When did the mosque Hassan 2 in casablanca has been inagaurated?",
        answer : "August 30, 1993",
    },
    {
        question : "How do you greet an old person in the Philippines?",
        answer : "You take their hand and put in on your forehead",
    },
];

(async function insertCards() {

try {
    await CardModel.deleteMany()
    // const series = await SerieModel.find()
    const authors = await UserModel.find()
    // cards.forEach(card => {
    // //     card.id_serie = series[Math.floor(Math.random() * series.length)]._id
    // // })
    cards.forEach(card => {
        card.id_author = authors[Math.floor(Math.random() * authors.length)]._id
    })
    const inserted = await CardModel.insertMany(cards); // insert docs in db
    console.log(`seed card done : ${inserted.length} documents inserted !`);
    process.exit();
  } catch (err) {
    console.error(err);
  }
})();
// CardModel
// .deleteMany()
// .then(ok => {

//     Cardmodel
//     .insertMany(cards)
//     .then((res) => console.log("seed cards ok"));
// })
// .catch(err => console.err(err));