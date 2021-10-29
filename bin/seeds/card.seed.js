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

  {
    question: "how many times federer won roland garros ?",
    answer: "One time and it was in 2009",
  },

  {
    question: "Who has won Roland Garros the most times?",
    answer: "Rafael Nadal",
  },

  {
    question:" What Is An Ace in Tennis  ?",
  answer: "when a player delivers a legal serve and doesn’t touch the opponent’s racket"
}
];

const cardsFootball = [
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

  {
    question: "With how many kisses do the French greet ?",
    answer: "2"
  }
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

const cardsRivers = [

  {
    question: "What is the river that runs through Paris called ?",
    answer: "Seine river",
  }
];

const CardsMusic = [
  {
    question: "Who sing Petite Marie ?",
    answer: "Francis Cabrel",
  }
];

const CradFashion = [
  {
    question: "What was Coco Chanel's real first name ?",
    answer: "Gabrielle"
  }
];

const CardsPython = [
  {
    question: "What is python ?",
    answers: "Is an interpreted high-level general-purpose programming language"
  }
];

const CardsJava = [
  {
    question: "What is Java ?",
    answer: "Java is a cross-platform object-oriented programming language"
  }
];

const cardsCapitalCity = [
  {
    question: "What is the capital of France ?",
    answer: "Paris"
  }
];

const CardsGeopolitics = [
  {
    question: "What is the Geopolitics ?",
    answer: "the study of the effects of geography on international politics."
  }
];


const CardsWar = [
  {
    question: "What was the London Blitz ?",
    answer: "A term used for Germany’s bombing campaign on London"
  }
];




insertCards("Monuments", cardsMonuments);
insertCards("Food", cardsFood);
insertCards("Tennis", cardsTennis);
insertCards("Football", cardsFootball);
insertCards("Baseball", cardsBaseball);
insertCards("Basketball", cardsBasketball);
insertCards("Volleyball", cardsVolleyball);
insertCards("Greetings", cardsGreetings);
insertCards("Traditional festivals", cardsTraditionalFestivals);
insertCards("Religion", cardsReligion);
insertCards("Superstitions", cardsSuperstitions);
insertCards("Family traditions", cardsFamilyTraditions);
insertCards("JavaScript", cardsJavaScript);
insertCards("Rivers", cardsRivers);
insertCards("Music", CardsMusic);
insertCards("Fashion", CradFashion);
insertCards("Python", CardsPython);
insertCards("Java", CardsJava);
insertCards("Capital City", cardsCapitalCity);
insertCards("Geopolitics", CardsGeopolitics);
insertCards("War", CardsWar);

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
