require("dotenv").config();
require("./../../config/mongo"); // fetch the db connection
const CategoryModel = require("./../../models/Category");


const categories = [
  {
    name: "FrenchLovers",
  },
  {
    name: "Sports",
  },
  {
    name: "Programming",
  },
  {
    name: "General knowledge",
  },
  {
    name: "Customs and Manners",
  },
];

(async function insertCategories() {
try {
    await CategoryModel.deleteMany()
    const inserted = await CategoryModel.insertMany(categories); // insert docs in db
      console.log(`seed category done : ${inserted.length} documents inserted !`);
      process.exit();
    } catch (err) {
      console.error(err);
    }
  })();
//     categories.forEach(category => {
//         serie.id_categories = categories[Math.floor(Math.random() * categories.length)]._id
//     })
