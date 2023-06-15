async function dialogoDestino(client, message) {
  const texto =
<<<<<<< HEAD:src/dialogs/dialogoDestino.js
    "*Informe o seu destino de viagem:*";
=======
    "Informe seu nome para iniciarmos o atendimento!";
>>>>>>> 7c799f667bc654c18ccd1083205a8fb124a702cf:src/dialogs/dialogo3.js
  await client
    .sendText(message.from, texto)
    .then(() => {
      console.log("Mensagem enviada");
    })
    .catch((error) => {
      console.error("Erro ao enviar mensagem", error);
    });
}
export default dialogoDestino;