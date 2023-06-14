async function dialogoatendente(client, message) {
  const texto =
    "*Certo, de agora pra frente o atendente vai atender você, só um instante por favor.*";
  await client
    .sendText(message.from, texto)
    .then(() => {
      console.log("Mensagem enviada.");
    })
    .catch((error) => {
      console.error("Erro ao enviar mensagem", error);
    });
}
export default dialogoatendente;
