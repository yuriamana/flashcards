//array id of cards = les cartes dans le serie
//creator de la serie 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const serieSchema = new Schema ({
    name: String,
    id_category : { type: Schema.Types.ObjectId, ref: "category" },
    id_author : { type: Schema.Types.ObjectId, ref: "user" },
    id_cards : [{ type: Schema.Types.ObjectId, ref: "card" }],
})

const SerieModel = mongoose.model("serie", serieSchema);

module.exports = SerieModel;
