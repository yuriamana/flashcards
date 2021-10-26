require("dotenv").config();
require("./../../config/mongo");
const UserModel = require('../../models/User')
const CardModel = require("./../../models/Card");
const CategoryModel = require("./../../models/Category");
const SerieModel = require("./../../models/Serie");

const users = [
  {
    name: "Ironhacker",
    lastname: "Hacker Squad",
    email: "ironhack@bootcamp.fr",
    password: "h@lloween",
    
  },
  {
    name: "Ironhacker1",
    lastname: "Hacker Squad1",
    email: "ironhack1@bootcamp.fr",
    password: "h@lloween1",
    
  },
];

(async function insertUsers() {
    try {
        await UserModel.deleteMany()
        const inserted = await UserModel.insertMany(users); // insert docs in db
          console.log(`seed user done : ${inserted.length} documents inserted !`);
          process.exit();
        } catch (err) {
          console.error(err);
        }
      })();