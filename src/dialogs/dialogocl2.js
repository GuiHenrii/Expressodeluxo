function dialogocl2(client, message) {
  const texto =
    "Descreva em poucas palavras o que precisa ou informe o numero do pedido e aguarde alguns instante que o atendente ira te responder.";
  client
    .sendText(message.from, texto)
    .then(() => {
      console.log("Mensagem enviada.");
    })
    .catch((error) => {
      console.error("Erro ao enviar mensagem", error);
    });
}

export default dialogocl2;
