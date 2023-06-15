<<<<<<< HEAD:src/dialogs/dialogoNome.js
async function dialogoNome(client, message) {
  const texto =
    "*Informe seu nome para iniciarmos o atendimento!*";
=======
async function dialogo5(client, message, pizza) {
  
  const texto = `*A pizza escolhida foi ${pizza}*. Deseja adicionar outra pizza ou bebida?\n
  1- Sim 2- Não`;
>>>>>>> 7c799f667bc654c18ccd1083205a8fb124a702cf:src/dialogs/dialogo5.js
  await client
    .sendText(message.from, texto)
    .then(() => {
      console.log("Mensagem enviada");
    })
    .catch((error) => {
      console.error("Erro ao enviar mensagem", error);
    });
}
export default dialogoNome;