require("dotenv").config();
require("./../../config/mongo");
const CardModel = require("./../../models/Card");
const CategoryModel = require("./../../models/Category");
const SerieModel = require("./../../models/Serie");
const UserModel = require("./../../models/User");

// const series = [
//   {
//     name: "Culinary Specialties",
//   },
//   {
//     name: "Tennis",
//   },
//   {
//     name: "JavaScript",
//   },
//   {
//     name: "Monuments",
//   },
//   {
//     name: "Greetings",
//   },
// ];

const serieFrenchLover = [
  {
    name: "Food",
  },
  {
    name: "Monuments",
  },
  {
    name: "Rivers",
  },
  {
    name: "Music",
  },
  {
    name: "Fashion",
  },
];

const serieProgramming = [
  {
    name: "Python",
  },
  {
    name: "C++",
  },
  {
    name: "C#",
  },
  {
    name: "Java",
  },
  {
    name: "JavaScript",
  },
];

const serieSports = [
  {
    name: 'Tennis'
  },
  {
    name: 'Soccer'
  },
  {
    name: 'Baseball'
  },
  {
    name: 'Basketball'
  },
  {
    name: 'Volleyball'
  },
];

const serieGeneralKnowlegde = [
  {
    name: ''
  },
  {
    name: ''
  },
  {
    name: ''
  },
  {
    name: ''
  },
  {
    name: ''
  },
]

(async function insertSerie() {
  try {
    await SerieModel.deleteMany();
    // const categories = await CategoryModel.find();
    // const authors = await UserModel.find();
    // const cards = await CardModel.find();
    // series.forEach((serie) => {
    //   serie.id_category =
    //     categories[Math.floor(Math.random() * categories.length)]._id;
    // });
    // series.forEach((serie) => {
    //   serie.id_author = authors[Math.floor(Math.random() * authors.length)]._id;
    // });
    // series.forEach((serie) => {
    //   serie.id_cards = cards[Math.floor(Math.random() * cards.length)]._id;
    // });
    const inserted = await SerieModel.insertMany(series); // insert docs in db
    console.log(`seed serie done : ${inserted.length} documents inserted !`);
    process.exit();
  } catch (err) {
    console.error(err);
  }
})();
