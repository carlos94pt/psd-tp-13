const net = require("net");
const PORT = 8000;
const readline_sync = require("readline-sync");

const menuOptions1 = ["Entrada do Parque", "Saida do Parque"];

const registar_entrada_veiculo = () => {
   console.clear();
   console.log("------- ENTRADA DE VEICULO -------\n\n");
   const matricula = readline_sync.question("Indique a matricula do veiculo: ");
   const parqueId = readline_sync.question("Indique o id do parque: ");
   const utilizadorId = readline_sync.question("Indique o id do utilizador: ");
   client.write(
       JSON.stringify({
          tipo: 1,
          matricula: matricula,
          parqueId : parqueId,
          utilizadorId: utilizadorId
       })
   );
};

const registar_saida_veiculo = () => {
   console.clear();
   console.log("------- SAÍDA DE VEICULO -------\n\n");
   const matricula = readline_sync.question("Indique a matricula do veiculo: ");
   const parqueId = readline_sync.question("Indique o id do parque: ");
   client.write(
       JSON.stringify({
          tipo: 2,
          matricula: matricula,
          parqueId: parqueId,
       })
   );
};

const showMenu = () => {
   console.clear();
   console.log("------- MENU INICIAL -------\n\n");
   const index = readline_sync.keyInSelect(
       menuOptions1,
       "Seleciona uma das opções?"
   );
   if (index == 0) {
      registar_entrada_veiculo();
   } else if (index == 1) {
      registar_saida_veiculo();
   } else if (index == -1) {
      process.exit(0);
   }
};

const callBackConnect = () => {
   console.log(`Ligação estabelecida com servidor\n`);
   console.clear();
   showMenu();
};

let client = net.connect({ host: "localhost", port: PORT }, callBackConnect);

const callBackReceiveData = (data) => {
   const mensagem = JSON.parse(data);
   console.log("\n");
   console.log(mensagem);
   if (mensagem.tipo == 1 || mensagem.tipo == 2) {
      const index = readline_sync.keyInSelect(
          ["Continuar"],
          "Escolha o serviço que pretende executar?"
      );
      if (index == 0) {
         showMenu();
      } else if (index == -1) {
         process.exit(0);
      }
   }
};

const callBackError = (err) => {
   console.clear();
   console.log("Servidor não encontrado!\n\n");
   setTimeout(() => {
      console.log("Nova tentativa de conexão");
      client = net.connect({ host: "localhost", port: PORT }, callBackConnect);
      client.on("error", callBackError);
      client.on("data", callBackReceiveData);
   }, 8000);
   console.log("Tentativa de conexão em 8 segundos");
};

client.on("data", callBackReceiveData);

client.on("error", callBackError);