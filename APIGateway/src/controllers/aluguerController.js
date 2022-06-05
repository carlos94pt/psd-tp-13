"use strict";

const mongoose = require("mongoose");
const util = require("./util.js");
const Aluguer =  require('../models/aluguerModel.js');
const Parque =  require('../models/parqueModel.js');

var valorAA = 0.90
var valorBB = 0.50
var valorCC = 0.30

exports.registar_entrada_veiculo = (
    matricula,
    idParque,
    idUtilizador,
    connection
) => {
    let verificarDados = util.verificarDadosEntrada(
        idParque,
        idUtilizador
    );
    verificarDados
        .then(() => {
            const esta= new Aluguer();
            esta.cliente = mongoose.Types.ObjectId(idUtilizador);
            esta.matricula = matricula;
            esta.parque = mongoose.Types.ObjectId(idParque);
            esta.horaInicio = new Date();
            esta.save((err) => {
                if (err) {
                    connection.write(
                        JSON.stringify({
                            tipo: 2,
                            message: err,
                        })
                    );
                } else {
                    connection.write(
                        JSON.stringify({
                            tipo: 1,
                            message: "Entrada no parque foi registada com sucesso!",
                        })
                    );
                }
            });
        })
        .catch((err) => {
            connection.write(JSON.stringify({ tipo: 2, mensagem: err }));
        });
};

exports.registar_saida_veiculo = (matricula, idParque, connection) => {
    let verificarDados = util.verificarDadosSaida(idParque);
    verificarDados
        .then(() => {
            let condition = {
                matricula: matricula,
                horaFim: null
            };
            Aluguer.findOne(condition)
                .populate("cliente")
                .exec((err, result) => {
                    if (err || !result) {
                        connection.write(
                            JSON.stringify({
                                tipo: 2,
                                message: "Erro ao encontrar o seu histórico",
                            })
                        );
                    } else {
                        result.horaFim = Date.now();

                        const numHoras = (result.horaFim - result.horaInicio) / (1000 * 60 * 60 * 24);
                        var minutos = numHoras*60

                        if(numHoras < 1){
                            var i = minutos
                            while(i>0){
                                result.valorFinal += valorAA
                                i-=15
                            }
                        }else if(numHoras <=2 && numHoras>=1){
                            var i = minutos
                            result.valorFinal = valorAA*4
                            i-=60
                            while(i>0){
                                result.valorFinal += valorBB
                                i-=15
                            }
                        }else{
                            var i = minutos
                            result.valorFinal = valorAA*4 + valorBB*4
                            i-=120
                            while(i>0){
                                result.valorFinal += valorCC
                                i-=15
                            }
                        }

                        //const saldo = result.cliente.updateSaldo(result.valorFinal);
                        result.save((err) => {
                            if (err) {
                                connection.write(
                                    JSON.stringify({
                                        tipo: 2,
                                        message: "Erro ao registar entrada",
                                    })
                                );
                            } else {
                                connection.write(
                                    JSON.stringify({
                                        tipo: 1,
                                        message: "Saída do parque executada com sucesso. ",
                                    })
                                );
                            }
                        });
                    }
                });
        })
        .catch((err) => {
            connection.write(JSON.stringify({ tipo: 2, mensagem: err }));
        });
};

exports.obter_aluguer = (req, res) => {
    util.obterUtilizador(req, res, (req, res, utilizador) => {
        if (!utilizador)
            return res.status(404).json({ message: "Utilizador não encontrado" });
        const condicao = {
            cliente: utilizador._id,
            horaFim: { $ne: null },
        };
        Aluguer.find(condicao)
            .populate("parque")
            .exec((err, result) => {
                if (err)
                    return res
                        .status(404)
                        .json({ message: "Parque não encontrado" });
                res.status(200).json(result);
            });
    });
};

exports.entrada = (req, res) => {
    util.obterUtilizador(req, res, (req, res, utilizador) => {
        if (!utilizador)
            return res.status(404).json({message: "Utilizador não encontrado"});
        const esta= new Aluguer();
        esta.cliente = mongoose.Types.ObjectId(utilizador._id);
        esta.matricula = req.body.matricula;
        esta.parque = mongoose.Types.ObjectId(req.body.idParque);
        esta.horaInicio = new Date();
        esta.save((err) => {
            if (err) {
                res.status(404).json({
                    message:"Erro ao gravar"
                })
            } else {
                res.status(200).json({
                    aluguerId: esta._id,
                    message:"Entrada com sucesso!"
                })
            }
        });

    })
}

exports.saida = (req, res) => {
    util.obterUtilizador(req, res, async (req, res, utilizador) => {
        if (!utilizador)
            return res.status(404).json({message: "Utilizador não encontrado"});
        const esta = await Aluguer.findById(req.body.aluguerId)
        if (esta) {
            esta.horaFim = Date.now();

            const numHoras = (esta.horaFim - esta.horaInicio) / (1000 * 60 * 60 * 24);
            var minutos = numHoras*60

            if(numHoras < 1){
                var i = minutos
                while(i>0){
                    esta.valorFinal += valorAA
                    i-=15
                }
            }else if(numHoras <=2 && numHoras>=1){
                var i = minutos
                esta.valorFinal = valorAA*4
                i-=60
                while(i>0){
                    esta.valorFinal += valorBB
                    i-=15
                }
            }else{
                var i = minutos
                esta.valorFinal = valorAA*4 + valorBB*4
                i-=120
                while(i>0){
                    esta.valorFinal += valorCC
                    i-=15
                }
            }
            await esta.save()
            res.status(200).json({
                message: "Saída efetuada com sucesso!",
                total: esta.valorFinal
            })

        } else {
            res.status(404).json({
                message: "Erro na pesquisa"
            })
        }

    })



}

exports.todos = (req, res) => {
    util.obterUtilizador(req, res, (req, res, utilizador) => {
        if (!utilizador)
            return res.status(404).json({ message: "Utilizador não encontrado" });
        const condicao = {
            cliente: utilizador._id,
            horaFim: { $eq: null },
            valorFim: {$eq: 0}
        };
        Aluguer.find(condicao)
            .populate("parque")
            .exec((err, result) => {
                if (err)
                    return res
                        .status(404)
                        .json({ message: "Parque não encontrado" });
                res.status(200).json(result);
            });
    });
};