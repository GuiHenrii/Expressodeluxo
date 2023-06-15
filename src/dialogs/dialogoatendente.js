<<<<<<< HEAD:src/dialogs/dialogoatendente.js
async function dialogoatendente(client, message) {
  const texto =
    "*Certo, de agora pra frente o atendente vai atender você, só um instante por favor.*";
=======
async function dialogo4(client, message) {
  const texto =
    "*Qual o numero da pizza!*\nVocê pode consultar o link do cardápio e verificar um numero.\nhttps://bit.ly/cardapiobellapizzaudi";
>>>>>>> 7c799f667bc654c18ccd1083205a8fb124a702cf:src/dialogs/dialogo4.js
  await client
    .sendText(message.from, texto)
    .then(() => {
      console.log("Mensagem enviada.");
    })
    .catch((error) => {
      console.error("Erro ao enviar mensagem", error);
    });
}
<<<<<<< HEAD:src/dialogs/dialogoatendente.js
export default dialogoatendente;
=======
export default dialogo4;
>>>>>>> 7c799f667bc654c18ccd1083205a8fb124a702cf:src/dialogs/dialogo4.js
