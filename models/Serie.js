//array id of cards = les cartes dans le serie
//creator de la serie 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const serieSchema = new Schema ({
    name: String,
    id_categories: { type: Schema.Types.ObjectId, ref: "category" },
})

const SerieModel = mongoose.model("serie", serieSchema);

module.exports = SerieModel;
