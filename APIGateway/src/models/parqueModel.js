"use strict";
const mongoose = require("mongoose");
require("mongoose-double")(mongoose);
const Schema = mongoose.Schema;

const parqueSchema = new Schema(
   {
      nome: {
         type: String,
         required: "Nome",
      },
       rua: {
           type: String,
           required: "Rua",
       },
       lotacao: {
           type: Number,
           default: 0.0,
       },
       latitude: {
           type: mongoose.Schema.Types.Double,
           default: 0,
       },
       longitude: {
           type: mongoose.Schema.Types.Double,
           default: 0,
       },
       estado: {
           type: Number,
           default: 0
       }
   },
   { collection: "parqueCollection" }
);
// --------------------------------------------------
// - definition of Schema Methods

// --------------------------------------------------

module.exports = mongoose.model("Parque", parqueSchema);
