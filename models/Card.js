const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  id_series: { type: Schema.Types.ObjectId, ref: "serie" },
  id_authors: { type: Schema.Types.ObjectId, ref: "user" },
});

const CardModel = mongoose.model("card", cardSchema);

module.exports = CardModel;


// doc 1
// { category: "France", theme: "Monuments", q: "je suis la plus haute tour en france", r: "montparnasse"}
// doc 2
// { category: "Italy", theme: "Celebrities", q: "je suis un master media / politicien", r: "silvio"}
// doc 3
// { category: "France", theme: "Monuments", q: "je suis la plus haute tour en france", r: "montparnasse"}


/*

user {id, email, pass, avatar}
card {id, question, answer, serieId, authorId}
serie {id, name, categoryId}
category {id, name }
 */