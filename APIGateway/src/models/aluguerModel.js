"use strict";
const mongoose = require("mongoose");
require("mongoose-double")(mongoose);
const Schema = mongoose.Schema;

const aluguerSchema = new Schema(
    {
        cliente: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Utilizador",
            required: "Cliente",
        },
        parque: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Parque",
            required: "Parque",
        },
        horaInicio: {
            type: Date,
            default: Date.now,
        },
        horaFim: {
            type: Date,
            default: null,
        },
        valorFinal: {
            type: mongoose.Schema.Types.Double,
            default: 1.5,
        },
        matricula: {
            type: String,
            default: "AA-00-ZZ"

        }

    },
    { collection: "AluguerCollection" }
);

module.exports = mongoose.model("Aluguer", aluguerSchema);
