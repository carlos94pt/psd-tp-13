'use strict';

const passport = require('passport')
const mongoose = require('mongoose')
const util = require("./util.js");
const Utilizador =  require('../models/utilizadorModel.js');



exports.registar_utilizador = (req, res) => {
   const rb = req.body
   const todosParams = rb.username && rb.nome && rb.email && rb.password;
   if (!todosParams) {
      return res
          .status(400)
          .json({"message" : "todos os campos são necessários"})
   }
   const utilizador = new Utilizador()
   utilizador.username = req.body.username
   utilizador.nome = req.body.nome
   utilizador.email = req.body.email
   utilizador.dadosPassword = {hash:'', salt:''}
   utilizador.tipo = req.body.tipo
   utilizador.setDadosPassword(req.body.password)
   // guardar
   utilizador.save( (err) => {
      if (err) {
         res.status(404).json(err)
      } else {
         const token = utilizador.gerarJwt();
         res.status(200).json(token);
      }

   })

}

exports.autenticar = (req, res) => {
   const rb = req.body
   const todosParams = rb.username
       && rb.password;
   if (!todosParams) {
      return res
          .status(400)
          .json({"message": "todos os campos são necessários"})
   }
   passport.authenticate('local', (err, utilizador, info) => {

      if (err) {
         return res.status(404).json(err)
      }
      if (utilizador) {
         const token = utilizador.gerarJwt();
         res.status(200).json({token});
      } else {
         res.status(401) // não está autorizado
             .json(info)
      }
   })(req, res)
}
/*
exports.verificar_token = (req, res) => {
   util.obterUtilizador(req, res, (req, res, utilizador) => {
      if (!utilizador) {
         return res.status(404).json({ message: "Utilizador não encontrado" });
      }
      res.status(200).json({ message: "Token válido" });
   });
};
*/

exports.verificar_token = (req, res,next) => {
   const token = req.headers["x-access-token"]
   jwt.verify(token, segredo, function(err) {
      if(err) {
         return res.status(401).send("Token invalido")
      }
      else {
         res.status(200).json({ message: "Token válido" });
         next()
      }
   })
};


exports.verificar_saldo = (req, res) => {
   util.obterUtilizador(req, res, (req, res, utilizador) => {
      if (!utilizador)
         return res.status(404).json({ message: "Utilizador não encontrado" });
      res.status(200).json({ saldo: utilizador.saldo });
   });
};

exports.adicionar_saldo = (req, res) => {
   util.obterUtilizador(req, res, (req, res, utilizador) => {
      if (!utilizador)
         return res.status(404).json({ message: "Utilizador não encontrado" });
      const todosParams = req.body.saldo;
      if (!todosParams)
         return res
             .status(400)
             .json({ message: "É necessário introduzir o saldo" });
      Utilizador.findByIdAndUpdate(
          utilizador._id,
          { $inc: { saldo: req.body.saldo } },
          { new: true },
          (err, result) => {
             res.status(200).json({ saldo: result.saldo });
          }
      );
   });
};

/*
exports.obter_utilizador = (req, res) => {
   util.obterUtilizador(req, res, (req, res, utilizador) => {
      if (!utilizador)
         return res.status(404).json({ message: "Utilizador não encontrado" });
      res.status(200).json({
         tipo: utilizador.tipo,
         username: utilizador.username,
         nome: utilizador.nome,
         email: utilizador.email,
      });
   });
};
*/


