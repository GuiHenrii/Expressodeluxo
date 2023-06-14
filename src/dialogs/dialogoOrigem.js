async function dialogoOrigem(client, message) {
  const texto =
    "*Informe a origem da sua viagem:*";
  await client
    .sendText(message.from, texto)
    .then(() => {
      console.log("Mensagem enviada");
    })
    .catch((error) => {
      console.error("Erro ao enviar mensagem", error);
    });
}
export default dialogoOrigem;