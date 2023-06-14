async function dialogoDestino(client, message) {
  const texto =
    "*Informe o seu destino de viagem:*";
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