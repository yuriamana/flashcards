require("dotenv").config();
require("./../../config/mongo"); //fetch the db connection
const CardModel = require("./../../models/Card");
const UserModel = require("./../../models/User")
const SerieModel = require("./../../models/Serie");
// const Categorymodel = require("./../../models/Category");
// const Seriemodel = require("./../../models/Serie");
// const cards = [
//     {
//         question : "What is the traditional breakfast in France?",
//         answer : "Croissant and coffee",
//     },
//     {
//         question : "Who is Roland Garros?",
//         answer : "a French pioneering aviator and fighter pilot during World War",
//     },
//     {
//         question : "What JSON stands for?",
//         answer : "JavaScript Object Notation",
//     },
//     {
//         question : "When did the mosque Hassan 2 in casablanca has been inagaurated?",
//         answer : "August 30, 1993",
//     },
//     {
//         question : "How do you greet an old person in the Philippines?",
//         answer : "You take their hand and put in on your forehead",
//     },
// ];

const cardsMonuments = [
    {
        question: 'What is the famous tower in Paris?',
        answer: 'Eiffel tower'
    },  
];

const cardsFood = [
    {
        question: 'What is fondue?',
        answer: 'Melted cheese you eat with potatoes and/or cold cuts'
    },
];

const cardsRivers = [
    {

    }
]

insertCards('Monuments', cardsMonuments)
// insertCards('')
// insertCards()
// insertCards()
// insertCards()

async function insertCards(serieName, array) {

try {
    await CardModel.deleteMany()
    // const series = await SerieModel.find()
    let author = await UserModel.find()
    author = author[0]
    // cards.forEach(card => {
    // //     card.id_serie = series[Math.floor(Math.random() * series.length)]._id
    // // })

    array.forEach(card => {
        card.id_author = author._id
    })
    const inserted = await CardModel.insertMany(array); // insert docs in db
    inserted.forEach(async newCard => {
        await SerieModel.findOneAndUpdate({name: serieName}, { $push: { id_cards: newCard._id } },
            { new: true })
    })
    console.log(`seed  card done for ${serieName} : ${inserted.length} documents inserted !`);
  
  } catch (err) {
    console.error(err);
  }
}
// CardModel
// .deleteMany()
// .then(ok => {

//     Cardmodel
//     .insertMany(cards)
//     .then((res) => console.log("seed cards ok"));
// })
// .catch(err => console.err(err));