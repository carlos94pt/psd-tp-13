"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const veiculoSchema = new Schema(
   {
      matricula: {
         type: String,
         required: "Matricula do veiculo",
      },
   },
   { collection: "VeiculosCollection" }
);


veiculoSchema.methods.setEstado = function (novoEstado) {
    this.estado = novoEstado;
    this.save();
};

veiculoSchema.methods.registarEntrada = function (novoEstado, idParque) {
    this.zonaAtual = idParque;
    this.estado = novoEstado;
    this.save();
};

// --------------------------------------------------
// - export the Utilizador Schema
module.exports = mongoose.model("Veiculo", veiculoSchema);
