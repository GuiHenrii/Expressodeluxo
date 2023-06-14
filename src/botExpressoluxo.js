import { create, Whatsapp } from "venom-bot";
import fs from "fs";
import moment from "moment/moment.js";
import path from "path";
import dialogoinicio from "./dialogs/dialogoinicio.js";
import dialogoNome from "./dialogs/dialogoNome.js";
import dialogoTel from "./dialogs/dialogoTel.js";
import dialogoDestino from "./dialogs/dialogoDestino.js";
import dialogoOrigem from "./dialogs/dialogoOrigem.js";
import dialogoSaida from "./dialogs/dialogoSaida.js";
import dialogoRetorno from "./dialogs/dialogoRetorno.js";
import dialogo2 from "./dialogs/dialogo2.js";
import dialogoValor from "./dialogs/dialogoValor.js";
import dialogoPassagem from "./dialogs/dialogoPassagem.js";
import dialogocomprar from "./dialogs/dialogocomprar.js";
import dialogoatendente from "./dialogs/dialogoatendente.js";
import dialogoencerra from "./dialogs/dialogoencerra.js";
import dialogoError from "./dialogs/dialogoError.js";
import dialogonNome from "./dialogs/dialogoNome.js";
import { Console } from "console";
//import dialogo6 from "./dialogs/dialogo6.js";
const date = new Date();
const horario = fs.readFileSync("./imagens/horario.PNG");

function start(client) {
  console.log("Cliente Venom iniciado!");

  // Inicio atendimento
  const atendimento = {};
  // função para salvar os dados
  function salvaContato(tempObj) {
    console.log("Início da função salvaContato");
    console.log("Objeto recebido:", tempObj);

    fs.readFile("atendimentos.json", "utf8", (err, data) => {
      if (err) {
        console.error("Erro ao ler o arquivo atendimentos.json", err);
        return;
      }
      console.log("Arquivo atendimentos.json lido com sucesso");
      const atendimentos = JSON.parse(data);

      atendimentos.push(tempObj);

      const json = JSON.stringify(atendimentos, null, 2);
      fs.writeFile("atendimentos.json", json, "utf8", (err) => {
        if (err) {
          console.error("Erro ao escrever o arquivo atendimentos.json", err);
          return;
        }
        console.log("Arquivo atendimentos.json salvo com sucesso");
      });
    });
  }

  client.onMessage((message) => {
    // Se não é de grupo(false) executa o codigo:
    if (message.isGroupMsg === false) {
      // Monta a constante para o objeto
      const tel = message.from;

      if (!atendimento[tel]) {
        console.log("Creating new atendimento entry");

        let stage = 1;

        atendimento[tel] = {
          tel: tel,
          cliente: null,
          passagem: null,
          dataida: null,
          comprar: null,
          destino: null,
          stage: stage, // Define em qual Else if o cliente esta. Controla a msg
        };
        console.log("New atendimento entry created:", atendimento[tel]);
      }
      console.log(message);
      //  ---------- Inicio da conversa
      if (message.body && atendimento[tel].stage === 1) {
        dialogoinicio(client, message);
        atendimento[tel].stage = 2;
      }
      //  -------------------- Envia o os horarios de onibus
      else if (message.body === "1" && atendimento[tel].stage === 2) {
        client
          .sendImage(message.from, "./imagens/horario.png", "image-name", "")
          .then((result) => {
            console.log("Result: ", result); //return object success
          })
          .catch((erro) => {
            console.error("Error when sending: ", erro); //return object error
          });
      }
      //  -------------------- Envia os Valores
      else if (message.body === "2" && atendimento[tel].stage === 2) {
        client
          .sendImage(message.from, "./imagens/valor.png", "image-name", "")
          .then((result) => {
            console.log("Result: ", result); //return object success
          })
          .catch((erro) => {
            console.error("Error when sending: ", erro); //return object error
          });
      }
      //  -------------------- Faz a pergunta da data
      else if (message.body === "3" && atendimento[tel].stage === 2) {
        dialogo2(client, message);
        atendimento[tel].stage = 5;
      }
      //Pacote de viagens
      else if (message.body === "4" && atendimento[tel].stage === 2) {
        atendimento.cliente = message.body;
        dialogoNome(client, message);
        atendimento[tel].stage = 10;
      } else if (message.body && atendimento[tel].stage === 10) {
        dialogoTel(client, message);
        atendimento[tel].stage = 4;
      } else if (message.body && atendimento[tel].stage === 4) {
        dialogoSaida(client, message);
        atendimento[tel].stage = 5;
      } else if (message.body && atendimento[tel].stage === 5) {
        dialogoRetorno(client, message);
        atendimento[tel].stage = 6;
      }
      //
      else if (message.body && atendimento[tel].stage === 6) {
        dialogoOrigem(client, message);
        atendimento[tel].stage = 7;
        //chama o end acaso não queira mais nada
      } else if (message.body && atendimento[tel].stage === 7) {
        dialogoDestino(client, message);
        atendimento[tel].stage = 15;
      } else if (message.body && atendimento[tel].stage === 15) {
        dialogoatendente(client, message);
        atendimento[tel].stage = 30;
      }
      //  -------------------- Faz abertura para aluguel
      else if (message.body === "5" && atendimento[tel].stage === 2) {
        dialogoatendente(client, message);
      }
      // Cria link de pesquisa pra o cliente
      else if (message.body && atendimento[tel].stage === 3) {
        dialogoPassagem(client, message);
        atendimento[tel].stage = 1;
      }
      // Cria link de pesquisa de compra para o cliente
      else if (message.body && atendimento[tel].stage === 5) {
        dialogocomprar(client, message);
        atendimento[tel].stage = 6;
      }
      // ---------- manda pro suporte
      else if (message.body === "6" && atendimento[tel].stage === 2) {
        atendimento.end = message.body;
        dialogoatendente(client, message);
        atendimento[tel].stage = 6;
        //manda pro administrativo
      } else if (message.body === "7" && atendimento[tel].stage === 2) {
        atendimento.end = message.body;
        dialogoatendente(client, message);
        atendimento[tel].stage = 7;
        //encerra o atendimento
      } else if (message.body === "8" && atendimento[tel].stage === 2) {
        atendimento.end = message.body;
        dialogoencerra(client, message);
        atendimento[tel].stage = 1;
      }

      // ---------------- joga o link pra comprar passagem-----------------
      else if (message.body === "1" && atendimento[tel].stage === 4) {
        atendimento[tel].passagem = message.body;
        const textomensagem =
          "Acesse o link para efetuar a compra da sua passagem:\nhttps://www.buson.com.br/viacao/expresso-de-luxo-mg";
        client
          .sendText(message.from, textomensagem)
          .then(() => {
            console.log("Messagem.");
          })
          .catch((error) => {
            console.error("Error when sending message", error);
          });
        atendimento[tel].stage = 3;
      }
      // --------------------- Final do ajuste ---------------
      // Caso algo de errado
      else {
        atendimento[tel].stage = 1;
        const texto =
          "Vamos reiniciar o seu atendimento, Por favor digite 'OK'";
        client
          .sendText(message.from, texto)
          .then(() => {
            console.log("Mensagem enviada.");
          })
          .catch((error) => {
            console.error("Erro ao enviar mensagem", error);
          });
      }
    }
  });
}

create()
  .then((client) => start(client))
  .catch((error) => {
    console.log(error);
  });
