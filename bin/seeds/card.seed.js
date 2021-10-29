require("dotenv").config();
require("./../../config/mongo"); //fetch the db connection
const CardModel = require("./../../models/Card");
const UserModel = require("./../../models/User");
const SerieModel = require("./../../models/Serie");

const cardsMonuments = [
  {
    question: "What is the famous tower in Paris?",
    answer: "Eiffel tower",
  },
];

const cardsFood = [
  {
    question: "What is fondue?",
    answer: "Melted cheese you eat with potatoes and/or cold cuts",
  },
];

const cardsTennis = [
  {
    question: "Who is Roland Garros ?",
    answer: "a French pioneering aviator",
  },
];

const cardsSoccer = [
  {
    question: "How many time France won world cup ?",
    answer: "Two Times",
  },
];

const cardsBaseball = [
  {
    question: "How many players on a baseball team ?",
    answer: "26 active players",
  },
];

const cardsBasketball = [
  {
    question: "Who made basketball ?",
    answer: "James Naismith",
  },
];

const cardsVolleyball = [
  {
    question: "How many players are on the court at one time ?",
    answer: "6 players on each side",
  },
];

const cardsGreetings = [
  {
    question: "What is a common greeting in Japan ?",
    answer: "In Japan, people greet each other by bowing",
  },
];

const cardsTraditionalFestivals = [
  {
    question: "What is the most famous Brazilian festival called ?",
    answer: "Carnival",
  },
];

const cardsReligion = [
  {
    question: "how many religion in the world ?",
    answer: "there are roughly 4,200 religions",
  },
];

const cardsSuperstitions = [
  {
    question: "Who invented superstitions ?",
    answer: "Dale Martin",
  },
];

const cardsFamilyTraditions = [
  {
    question: "What is a good family tradition ?",
    answer: "Eat dinner as a family",
  },
];

const cardsJavaScript = [
  {
    question: "What is Javascript ?",
    answer: "Is a programming Language for the web",
  },
  {
    question: "What are JavaScript Data Types ?",
    answer: "Number, String, Boolean, Object, Undefined",
  },
  {
    question: "What is the use of isNaN function ?",
    answer: "IsNaN function return true if the argument is not a number",
  },
  {
    question: "Which company developed JavaScript ?",
    answer: "Netscape",
  },
  {
    question: "What are all the looping structures in JavaScript ?",
    answer: "For, While, Do-While Loops",
  },
];

insertCards("Monuments", cardsMonuments);
insertCards("Food", cardsFood);
insertCards("Tennis", cardsTennis);
insertCards("Soccer", cardsSoccer);
insertCards("Baseball", cardsBaseball);
insertCards("Basketball", cardsBasketball);
insertCards("Volleyball", cardsVolleyball);
insertCards("Greetings", cardsGreetings);
insertCards("Traditional festivals", cardsTraditionalFestivals);
insertCards("Religion", cardsReligion);
insertCards("Superstitions", cardsSuperstitions);
insertCards("Family traditions", cardsFamilyTraditions);
insertCards("JavaScript", cardsJavaScript);

async function insertCards(serieName, array) {
  try {
    await CardModel.deleteMany();
    // const series = await SerieModel.find()
    let author = await UserModel.find();
    author = author[0];
    // cards.forEach(card => {
    // //     card.id_serie = series[Math.floor(Math.random() * series.length)]._id
    // // })

    array.forEach((card) => {
      card.id_author = author._id;
    });
    const inserted = await CardModel.insertMany(array); // insert docs in db
    inserted.forEach(async (newCard) => {
      await SerieModel.findOneAndUpdate(
        { name: serieName },
        { $push: { id_cards: newCard._id } },
        { new: true }
      );
    });
    console.log(
      `seed  card done for ${serieName} : ${inserted.length} documents inserted !`
    );
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
