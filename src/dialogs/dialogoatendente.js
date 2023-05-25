async function dialogoatendente(client, message) {
  const texto = "Certo, o seu atendimento já esta na fila e logo logo o atendente dará continuidade."
  await client
    .sendText(message.from, texto,)
    .then(() => {
      console.log("Mensagem enviada.");
    })
    .catch((error) => {
      console.error("Erro ao enviar mensagem", error);
    });
}
export default dialogoatendente;
