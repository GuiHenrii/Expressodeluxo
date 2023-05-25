async function dialogo2(client, message) {
  const texto =
  "Informe qual a data da viagem. Exemplo: 10/11/2023*"
  await client
    .sendText(message.from, texto)
    .then(() => {
      console.log("Message sent.");
    })
    .catch((error) => {
      console.error("Erro ao enviar mensagem", error);
    });
}
export default dialogo2;
