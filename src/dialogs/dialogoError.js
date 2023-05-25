async function dialogoError (client, message) {
  const texto = "Desculpe, algo deu errado. Por favor, reinicie o processo.";
  client
    .sendText(message.from, texto)
    .then(() => {
      console.log("Mensagem enviada");
    })
    .catch((error) => {
      console.error("Erro ao enviar mensagem", error);
    });
  };

export default dialogoError;
