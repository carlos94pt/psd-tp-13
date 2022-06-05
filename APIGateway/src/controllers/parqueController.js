"use strict";

const mongoose = require("mongoose");
const Parque =  require('../models/parqueModel.js');
const util = require("./util.js");
const segredo= 'esteEoSegredo'

exports.listar_parques = function (req, res) {
   let condicao = {};
   if (req.query.maxLotacao) {
      condicao = {lotacao: { $lte: req.query.maxLotacao } }
   }
   Parque.find(condicao)
       // .exec()
       .then(result => {
          res.status(200)
              .jsonp(result);
       })
       .catch(err => {
          res.status(500).jsonp({
             error: { message: err.message}
          })
       })
};

/*
exports.criar_parque = (req, res, next) => {

   const token = req.headers["x-access-token"]
   console.log(token)
   jwt.verify(token, segredo, function(err) {
      if(err) {
         return res.status(401).send("Token invalido")
      }
      else {
         const rb = req.body;
         const todosParams = rb.nome && rb.rua && rb.lotacao && rb.estado;
         if (!todosParams) {
            return res
                .status(400)
                .json({ message: "Todos os campos são necessários" });
         }
         const parque = new Parque();
         parque.nome = rb.nome;
         parque.rua = rb.rua;
         parque.lotacao=rb.lotacao;
         parque.estado = rb.estado;
         parque.save((err) => {
            if (err) {
               res.status(404).json(err);
            } else {
               res.status(200).json({
                  tipo: "sucesso",
                  message: "Parque criado",
               });
            }
         });
         next()
      }
   })
};*/





exports.criar_parque = (req, res) => {
   util.obterUtilizador(req, res, (req, res, utilizador) => {
      console.log(utilizador.tipo)
      if (utilizador.tipo === 1) {
         const rb = req.body;
         console.log(rb)
         const todosParams = rb.nome && rb.rua && rb.lotacao && rb.estado;
         if (!todosParams) {
            return res
                .status(400)
                .json({ message: "Todos os campos são necessários" });
         }
         const parque = new Parque();
         parque.nome = rb.nome;
         parque.rua = rb.rua;
         parque.lotacao=rb.lotacao;
         parque.estado = rb.estado;
         parque.save((err) => {
            if (err) {
               res.status(404).json(err);
            } else {
               res.status(200).json({
                  tipo: "sucesso",
                  message: "Parque criado com sucesso!",
               });
            }
         });
      } else {
         res.status(401).json({
            message: "Não tem autorização para criar parques",
         });
      }
   });
};
