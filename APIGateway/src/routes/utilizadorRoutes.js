'use strict'
const jwt = require("jsonwebtoken");
const Console = require("console");
const segredo= 'esteEoSegredo'
module.exports = function (auth, app) {
   const utilizadorCtrl = require('../controllers/utilizadorController');

   // rotas definidas para a API Restful utilizadores / autenticação

   // -- rota  /registar    métodos: POST
   app.route('/registar')
       .post(utilizadorCtrl.registar_utilizador)

   // -- rota  /login    métodos: POST
   app.route('/login')
       .post(utilizadorCtrl.autenticar);

   // app.route("/verificarToken").get(auth, utilizadorCtrl.verificar_token);

   //app.route("/utilizador").get(auth, utilizadorCtrl.obter_utilizador);





   const utilizador = (req, res, next) => {

      const token = req.headers["x-access-token"]
      jwt.verify(token, segredo, function(err, decoded) {
         if(err) {
            return res.status(401).send("Token invalido")
         }
         else {
            req.id = decoded._id;
            req.username = decoded.username
            console.log(req.username = decoded.username);
            req.email=decoded.email
            console.log(req.email = decoded.email);
            req.tipo=decoded.tipo
            req.nome=decoded.nome
            next()
         }
      })
   }


   app.get('/utilizador', utilizador, (req, res, next) => {
      console.log("Retornou utilizadores!");
      console.log(req.id);
      res.json([{id:req.id, username:req.username,email:req.email,tipo:req.tipo,nome: req.nome}]);
   })

   app.route("/saldo")
       .get(auth, utilizadorCtrl.verificar_saldo)
       .post(auth, utilizadorCtrl.adicionar_saldo);


}