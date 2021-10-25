require("dotenv").config();
require("./../../config/mongo");
const CardModel = require("./../../models/Card");
const CategoryModel = require("./../../models/Category");
const SerieModel = require("./../../models/Serie");

const series = [
  {
    name: "Monuments",
  },
  {
    name: "Culinary specialties",
  },
  {
    name: "Celebrities",
  },
  {
    name: "Arts & Culture",
  },
];

(async function insertSerie() {
    
    try {
      await SerieModel.deleteMany()
      const categories = await CategoryModel.find()
      series.forEach(serie => {
          serie.id_categories = categories[Math.floor(Math.random() * categories.length)]._id
      })
      const inserted = await SerieModel.insertMany(series); // insert docs in db
      console.log(`seed serie done : ${inserted.length} documents inserted !`);
      process.exit();
    } catch (err) {
      console.error(err);
    }
  })();
  