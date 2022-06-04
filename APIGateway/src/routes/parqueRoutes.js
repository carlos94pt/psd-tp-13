"use strict";
const utilizadorCtrl = require("../controllers/utilizadorController");
const parqueCtrl = require("../controllers/parqueController");
module.exports = function (auth, app) {
   const parqueCtrl = require("../controllers/parqueController");

   // -- rota  /registar    métodos: POST
   app.route("/parques")
       .get(parqueCtrl.listar_parques)
   app.route('/registarParques')
       .post(auth, parqueCtrl.criar_parque);
};
