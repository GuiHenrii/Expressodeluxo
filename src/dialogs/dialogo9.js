async function dialogo9(client, message) {
  const texto = "*Por gentileza informe a forma de pagamento:*";
  await client
    .sendText(message.from, texto)
    .then(() => {
      console.log("Mensagem enviada.");
    })
    .catch((error) => {
      console.error("Erro ao enviar mensagem", error);
    });
}
export default dialogo9;
