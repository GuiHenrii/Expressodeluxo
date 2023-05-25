import { create, Whatsapp } from "venom-bot";
import fs from "fs";
import moment from "moment/moment.js";
import path from "path";
import dialogoinicio from "./dialogs/dialogoinicio.js";
import dialogo2 from "./dialogs/dialogo2.js";
import dialogoValor from "./dialogs/dialogoValor.js";
import dialogoPassagem from "./dialogs/dialogoPassagem.js";
import dialogocomprar from "./dialogs/dialogocomprar.js";
import dialogoatendente from "./dialogs/dialogoatendente.js";
import dialogoencerra from "./dialogs/dialogoencerra.js";
import dialogoError from "./dialogs/dialogoError.js";
//import dialogo6 from "./dialogs/dialogo6.js";
const date = new Date();

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
        dialogo2(client, message);
        atendimento[tel].stage = 3;
      }
      //  -------------------- Envia os Valores
      else if (message.body === "2" && atendimento[tel].stage === 2) {
        dialogoValor(client, message);
        atendimento[tel].stage = 5;
      }
      //  -------------------- Faz a pergunta da data
      else if (message.body === "3" && atendimento[tel].stage === 2) {
      dialogo2(client, message);
      atendimento[tel].stage = 5;
        }
      // -------------------- Joga o link pra compra
      //else if (message.body === "3" && atendimento[tel].stage === 2) {
      //  dialogoPassagem(client, message);
       // atendimento[tel].stage = 4;
     // }
      //  -------------------- Faz abertura para aluguel
      else if (message.body === "4" && atendimento[tel].stage === 2) {
        dialogoatendente(client, message);
      }
      // Cria link de pesquisa pra o cliente
      else if (message.body && atendimento[tel].stage === 3) {
        dialogoPassagem(client, message);
      }
      // Cria link de pesquisa de compra para o cliente
      else if (message.body && atendimento[tel].stage === 5) {
        atendimento.comprar= message.body
        dialogocomprar(client, message);
        atendimento.stage = 20
      }
      // ---------- manda pro suporte
      else if (message.body === "5" && atendimento[tel].stage === 2) {
        atendimento.end = message.body;
        dialogoatendente(client, message);
        atendimento[tel].stage = 6;
        //manda pro administrativo
      } else if (message.body === "6" && atendimento[tel].stage === 2) {
        atendimento.end = message.body;
        dialogoatendente(client, message);
        atendimento[tel].stage = 7;
        //encerra o atendimento
      } else if (message.body === "7" && atendimento[tel].stage === 2) {
        atendimento.end = message.body;
        dialogoencerra(client, message);
        atendimento[tel].stage = 8;
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
        atendimento[tel].stage = 1;
      }
      // ------------------ Ajustes do pedido -----------------
      else if (message.body === "2" && atendimento[tel].stage === 12) {
        // Pergunta o que esta errado
        const textomensagem =
          "Me informe por favor o que ficou errado\n\n 7 - nome \n 8 - numero da pizza\n 9 - Endereço";
        client
          .sendText(message.from, textomensagem)
          .then(() => {
            console.log("Message sent.");
          })
          .catch((error) => {
            console.error("Error when sending message", error);
          });
        atendimento[tel].stage = 10;
      } else if (message.body === "7" && atendimento[tel].stage === 10) {
        // chama função de preenchimento do nome
        dialogoValor(client, message);
        atendimento[tel].stage = 11;
      } else if (message.body === "8" && atendimento[tel].stage === 10) {
        // Chama o atendimento
        dialogoatendente(client, message);
        atendimento[tel].stage = 13;
        //Altera o cep
      } else if (message.body === "9" && atendimento[tel].stage === 10) {
        dialogosup(client, message);
        atendimento[tel].stage = 5;
      } else if (message.body && atendimento[tel].stage === 11) {
        atendimento.cliente = message.body;

        const cliente = atendimento.cliente;
        const numeroPizza = atendimento.numeroPizza;
        const end = atendimento.end;

        //  Envia a mensagem de texto primeiro
        const textomensagem = `Se deseja comprar apenas uma passagem digite *1*\nSe deseja comprar um Pacote de Passagens *digite 2`;
        client
          .sendText(message.from, textomensagem)
          .then(() => {
            console.log("Message sent.");
          })
          .catch((error) => {
            console.error("Error when sending message", error);
          });

        atendimento[tel].stage = 12;
      } else if (message.body && atendimento[tel].stage === 13) {
        atendimento.numeroPizza = message.body;
        const cliente = atendimento.cliente;
        const numeroPizza = atendimento.numeroPizza;
        const end = atendimento.end;

        // Envia a mensagem de texto primeiro
        const textomensagem = `Agora ${cliente} confirme o seu pedido:\n\nNumero da Pizza: ${numeroPizza}\nEndereço: ${end}\nSe estiver correto digite 1 se não digite 2`;
        client
          .sendText(message.from, textomensagem)
          .then(() => {
            console.log("Message sent.");
          })
          .catch((error) => {
            console.error("Error when sending message", error);
          });

        atendimento[tel].stage = 12;
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
