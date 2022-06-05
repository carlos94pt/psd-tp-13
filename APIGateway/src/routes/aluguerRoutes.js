"use strict";
const jwt = require("jsonwebtoken");
module.exports = function (auth, app) {
   const aluguerCtrl = require("../controllers/aluguerController");
   // -- rota  /registar    métodos: POST
   app.route("/historico").get(auth, aluguerCtrl.obter_aluguer);
   app.route("/entrada").post(auth,aluguerCtrl.entrada);
   app.route("/saida").post(auth,aluguerCtrl.saida);
   app.route("/ativos").get(auth, aluguerCtrl.todos);


};
