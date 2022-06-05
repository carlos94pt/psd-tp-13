"use strict";

const aluguerCtrl = require("../controllers/aluguerController");

const errorCallbackFunction = (err) => {
   console.log("Erro de conexão");
};

const closeCallbackFunction = () => {
   console.log("Ligação terminada");
};

const dataCallbackFunction = (data, connection) => {
   const mensagem = JSON.parse(data);
   switch (mensagem.tipo) {
      case 1:
         if (mensagem.matricula && mensagem.parqueId && mensagem.utilizadorId) {
            connection.write(
                JSON.stringify({
                   tipo: 3,
                   message: "A processar...",
                })
            );
            aluguerCtrl.registar_entrada_veiculo(
                mensagem.matricula,
                mensagem.parqueId,
                mensagem.utilizadorId,
                connection
            );
         } else {
            connection.write(
                JSON.stringify({
                   tipo: 2,
                   message: "Saída, dados estão inválidos",
                })
            );
         }
         break;
      case 2:
         if (mensagem.matricula && mensagem.parqueId) {
            connection.write(
                JSON.stringify({
                   tipo: 3,
                   message: "Em operação...",
                })
            );
            aluguerCtrl.registar_saida_veiculo(
                mensagem.matricula,
                mensagem.parqueId,
                connection
            );
         } else {
            connection.write(
                JSON.stringify({
                   tipo: 2,
                   message: "Entrada, dados estão inválidos",
                })
            );
         }
         break;
      default:
         console.log("Tipo não definido");
   }
};

module.exports.callbackListenFunction = (port) => {
   console.log(`WebSocket a executar na porta:${port}\n`);
};

module.exports.callbackCreateFunction = (connection) => {
   console.log("Nova conexão");

   connection.on("error", (err) => {
      errorCallbackFunction(err);
   });

   connection.on("close", () => {
      closeCallbackFunction();
   });

   connection.on("data", (data) => {
      dataCallbackFunction(data, connection);
   });
};
