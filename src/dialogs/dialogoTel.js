async function dialogoTel(client, message) {
  const texto =
    "*Informe seu numero de contato:*";
  await client
    .sendText(message.from, texto)
    .then(() => {
      console.log("Mensagem enviada");
    })
    .catch((error) => {
      console.error("Erro ao enviar mensagem", error);
    });
}
export default dialogoTel;