/**
 *  ULP - Eng Informática (2021-22)
 *  Programação de Sistemas Distribuídos
 *  DATA: 09-05-2022 (para aula 10)
 *
 *  Autenticação e Autorização com token JWT
 */

 const express = require('express')
 const cors = require('cors')
 const net = require("net")
 
 const swaggerUI = require('swagger-ui-express')
 // npm install swagger-ui-express
 
 // const PORT = 5000
 require('dotenv').config(); // leitura ficheiro .env (npm i dotenv --save)
 // console.log(process.env) // listar environment
 if (!process.env.PORT) {
    throw new Error('indique a porta onde iniciar o servidor HTTP: variável de ambiente PORT');
 }
 const PORT = process.env.PORT
 
 const PORTSOCKET = process.env.PORTSOCKET
 
 
 const BD =  require('./src/config/configMongoDB');
 
 const UtilizadorModel =  require('./src/models/utilizadorModel');
 const ParqueModel =  require('./src/models/parqueModel');
 const AluguerModel =  require('./src/models/aluguerModel');
 const VeiculoModel = require('./src/models/veiculoModel');
 
 
 const UtilizadorRoutes =  require('./src/routes/utilizadorRoutes');
 const AluguerRoutes =  require('./src/routes/aluguerRoutes');
 const ParqueRoutes =  require('./src/routes/parqueRoutes');
 const VeiculoRoutes =  require('./src/routes/veiculosRoutes');
 
 
 
 /* documentação da API - Open API
 File > Convert and Save as JSON
  */
 const openAPIDoc = require('./API-Docs/openapi_v1.json')
 
 // configuração do express
 const app = express();
 app.use(express.json());
 app.use(express.urlencoded({ extended: false }));
 
 app.use(cors());
 app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization' ) // 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
    next();
 });
 
 const passport = require('passport');
 require('./src/config/configPassport');
 
 app.use(passport.initialize());
 
 const { expressjwt: jwt } = require("express-jwt");
 const SocketController = require("./src/controllers/socketController");
 
 
 const autenticacao = jwt({
    secret: "esteEoSegredo",
    userProperty: "payload",
    algorithms: ["HS256"], // novo??
 });
 
 // error handlers
 //    Catch unauthorised errors
 app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
       res
           .status(401)
           .json({"message" : err.name + ": " + err.message});
    }
 });
 
 
 
 // middleware para incluir a documentação OpenAPI
 app.use('/api-docs',       // a rota onde a documentação ficará disponível
     swaggerUI.serve,  // servidor da documentação
     swaggerUI.setup(openAPIDoc) // documento com a especificação da API
 )
 
 
 
 // registar as rotas
 UtilizadorRoutes(autenticacao, app);
 ParqueRoutes(autenticacao, app);
 AluguerRoutes(autenticacao, app);
 VeiculoRoutes(autenticacao, app);
 
 
 
 app.listen(PORT, () =>
     console.log(`servidor a executar em http://localhost:${PORT}`));
 
 const server = net.createServer((connection) => {
    SocketController.callbackCreateFunction(connection);
 });
 
 server.listen(PORTSOCKET, () => {
    SocketController.callbackListenFunction(PORTSOCKET);
 });