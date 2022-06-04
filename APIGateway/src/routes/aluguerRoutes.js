"use strict";
module.exports = function (auth, app) {
   const aluguerCtrl = require("../controllers/aluguerController");
   // -- rota  /registar    métodos: POST
   app.route("/entrada").post(auth, aluguerCtrl.registar_entrada_veiculo);
   app.route("/saida").post(auth, aluguerCtrl.registar_saida_veiculo);
};
