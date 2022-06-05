"use strict";

const mongoose = require("mongoose");
const Utilizador = mongoose.model("Utilizador");
const Parque = mongoose.model("Parque");

module.exports = {
    //Obter id do utilizador a partir do JWT
    obterUtilizador: (req, res, callback) => {
        //console.log(req)
        console.log(req.auth)
        if (req.auth && req.auth.username) {
            Utilizador.findOne({ username: req.auth.username }).exec(
                (err, utilizador) => {
                    if (!utilizador) {
                        return res
                            .status(404)
                            .json({ message: "Utilizador não encontrado" });
                    } else {
                        if (err) res.status(404).json(err);
                    }
                    callback(req, res, utilizador);
                }
            );
        } else {
            return res.status(404).json({ message: "Utilizador não encontrado" });
        }
    },

    verificarDadosEntrada: (idParque, idUtilizador) => {
        const zonaCheck = new Promise((resolve, reject) => {
            Parque.exists({ _id: idParque })
                .then((res) => {
                    if (res) {
                        resolve(res);
                    } else {
                        reject("Erro Parque inválido");
                    }
                })
                .catch((err) => {
                    reject("Erro id Parque mal formatado");
                });
        });

        const utilizadorCheck = new Promise((resolve, reject) => {
            Utilizador.exists({ _id: idUtilizador })
                .then((res) => {
                    if (res) {
                        resolve(res);
                    } else {
                        reject("Erro utilizador inválido");
                    }
                })
                .catch((err) => {
                    reject("Erro id do utilizador mal formatado");
                });
        });
        return Promise.all([zonaCheck, utilizadorCheck]);
    },
    verificarDadosSaida: (idParque) => {
        const zonaCheck = new Promise((resolve, reject) => {
            Parque.exists({ _id: idParque })
                .then((res) => {
                    if (res) {
                        resolve(res);
                    } else {
                        reject("Erro Parque inválido");
                    }
                })
                .catch((err) => {
                    reject("Erro id Parque mal formatado");
                });
        });
        return Promise.all([zonaCheck]);
    },
};
