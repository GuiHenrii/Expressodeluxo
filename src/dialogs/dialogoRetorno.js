async function dialogoRetorno(client, message) {
  const texto =
    "*Informe a data de retorno:*";
  await client
    .sendText(message.from, texto)
    .then(() => {
      console.log("Mensagem enviada");
    })
    .catch((error) => {
      console.error("Erro ao enviar mensagem", error);
    });
}
export default dialogoRetorno;